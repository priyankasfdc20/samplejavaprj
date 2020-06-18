# frozen_string_literal: true

require 'spec_helper'

module Relationships
  describe RelationshipService do
    let(:address_repository) { instance_double('Addresses::AddressRepository') }
    let(:geo_repository) { instance_double('Addresses::GeoRepository') }
    let(:relationship_repository) { instance_double('Relationships::RelationshipRepository') }
    let(:addresss_geo_provider) { Placements::AddressGeoProvider.new(geo_repository) }
    let(:relationship_service) do
      RelationshipService.new(address_repository, relationship_repository, addresss_geo_provider)
    end

    describe '#get_addresses' do
      let(:related_client) { Clients::Client.new(identifier: 'groot', birth_dt: '1989-06-01') }
      let(:token) { 'sauron' }

      context 'with child address and one relationship address' do
        let(:post_param_street_address_starlord) do
          { street_address: ' Sesame st', city: '', state: 'AK', zip: '' }
        end
        let(:post_param_street_address_groot) do
          { street_address: ' this st', city: '', state: 'CA', zip: '' }
        end

        it 'returns a two clients with address' do
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([Relationships::Relationship.new(related_client: related_client)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([Addresses::Address.new(street_name: 'Sesame st', state_code: 1823)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('groot', token)
            .and_return([Addresses::Address.new(street_name: 'this st', state_code: 1828)])
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_street_address_starlord, token)
            .and_return(Addresses::Address.new(lattitude: 1.1, longitude: 2.2))
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_street_address_groot, token)
            .and_return(Addresses::Address.new(lattitude: 3.3, longitude: 4.4))
          expect(relationship_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'groot',
                                        birth_dt: '1989-06-01',
                                        relationship_type: '',
                                        address: Addresses::Address.new(street_name: 'this st',
                                                                        state_code: 1828,
                                                                        state: 'CA',
                                                                        lattitude: 3.3,
                                                                        longitude: 4.4)),
                    Clients::Client.new(identifier: 'starlord',
                                        address: Addresses::Address.new(street_name: 'Sesame st',
                                                                        state_code: 1823,
                                                                        state: 'AK',
                                                                        lattitude: 1.1,
                                                                        longitude: 2.2))]
        end
      end

      context 'with child address and one relationship but no address ' do
        it 'returns clients with no addresses' do
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([Relationships::Relationship.new(related_client: related_client)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('groot', token)
            .and_return([])
          expect(relationship_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'groot',
                                        birth_dt: '1989-06-01',
                                        relationship_type: ''),
                    Clients::Client.new(identifier: 'starlord')]
        end
      end

      context 'with child address no relationship' do
        let(:post_param_street_address_starlord) do
          { street_address: ' Sesame st', city: '', state: 'AK', zip: '' }
        end

        it 'returns child client with address' do
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([Addresses::Address.new(street_name: 'Sesame st', state_code: 1823)])
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([])
          allow(geo_repository)
            .to receive(:validate)
            .with(post_param_street_address_starlord, token)
            .and_return(Addresses::Address.new(lattitude: 1.1, longitude: 2.2))
          expect(relationship_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'starlord',
                                        address: Addresses::Address.new(street_name: 'Sesame st',
                                                                        state_code: 1823,
                                                                        state: 'AK',
                                                                        lattitude: 1.1,
                                                                        longitude: 2.2))]
        end
      end

      context 'with child and one relationship and relationship type code ' do
        it 'returns clients with relationship type' do
          allow(relationship_repository)
            .to receive(:get_id)
            .with('starlord', token)
            .and_return([Relationships::Relationship.new(type_code: 175,
                                                         related_client: related_client)])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('starlord', token)
            .and_return([])
          allow(address_repository)
            .to receive(:addresses_by_client_id)
            .with('groot', token)
            .and_return([])
          expect(relationship_service.get_addresses('starlord', token))
            .to eq [Clients::Client.new(identifier: 'groot',
                                        birth_dt: '1989-06-01',
                                        relationship_type: 'Aunt/Nephew (Maternal)'),
                    Clients::Client.new(identifier: 'starlord')]
        end
      end
    end

    describe '#update_relationship' do
      let(:relationship) { Relationships::Relationship.new(id: 5, client_id: 55) }
      let(:token) { 'token' }
      r_params = {
        'id': '5',
        'client_id': '55',
        'related_client_id': '355',
        'type_code': '237',
        'absent_parent_indicator': 'false',
        'start_date': '2000-10-20',
        'end_date': '2018-10-20',
        'same_home_status': 'YES'
      }
      context 'with required parameters in body' do
        it 'updates a relationship' do
          allow(relationship_service).to receive(:update_relationship)
            .with('55', '5', r_params, token)
            .and_return(relationship)
          expect(relationship_service.update_relationship('55', '5', r_params, token))
            .to eq relationship
        end
      end
    end
  end
end
