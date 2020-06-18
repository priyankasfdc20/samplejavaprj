# frozen_string_literal: true

require 'spec_helper'
require 'relationships/relationship'
require 'json'

module Relationships
  describe RelationshipRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:relationships_repository) { RelationshipRepository.new(http_service) }
    let(:token) { 'sponge_bob_square_pants' }

    describe '#get_id' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no relationships' do
        it 'returns an empty collection' do
          allow(response).to receive(:body).and_return([])
          allow(http_service)
            .to receive(:get)
            .with('/clients/80/relationships', token)
            .and_return(response)
          expect(relationships_repository.get_id('80', token)).to eq []
        end
      end

      context 'with relationships' do
        it 'returns relationship' do
          allow(response).to receive(:body).and_return([{ identifier: '80' }])
          allow(http_service)
            .to receive(:get)
            .with('/clients/80/relationships', token)
            .and_return(response)
          expect(relationships_repository.get_id('80', token))
            .to eq [Relationship.new(identifier: '80')]
        end
      end
    end

    describe '#update_relationship' do
      let(:response) { instance_double('Faraday::Response') }
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
      context 'with relationships' do
        it 'updates a relationship' do
          allow(response).to receive(:body).and_return(id: '5', client_id: '55')
          allow(http_service)
            .to receive(:put)
            .with('/clients/55/relationships/5', r_params, token)
            .and_return(response)
          expect(relationships_repository.update_relationship('55', '5', r_params, token))
            .to eq [Relationship.new(id: '5', client_id: '55')]
        end
      end
    end
  end
end
