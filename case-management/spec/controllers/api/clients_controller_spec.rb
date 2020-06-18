# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ClientsController do
    describe '#show' do
      let(:client_repository) { instance_double('Client::ClientRepository') }
      let(:client) { Clients::Client.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/clients/33').to route_to(
          format: 'json',
          controller: 'api/clients',
          action: 'show',
          id: '33'
        )
      end

      it 'returns a client' do
        allow(Clients::ClientRepository).to receive(:new)
          .with(no_args).and_return(client_repository)
        allow(client_repository).to receive(:show).with('5', 'token').and_return(client)
        request.session[:token] = 'token'
        get :show, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end
    describe '#safety_alerts' do
      let(:client_repository) { instance_double('Client::ClientRepository') }
      let(:client) { Clients::Client.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/clients/33/safety_alerts').to route_to(
          format: 'json',
          controller: 'api/clients',
          action: 'safety_alerts',
          id: '33'
        )
      end

      it 'returns a safety_alerts' do
        allow(Clients::ClientRepository).to receive(:new)
          .with(no_args).and_return(client_repository)
        allow(client_repository).to receive(:safety_alerts).with('5', 'token').and_return(client)
        request.session[:token] = 'token'
        get :safety_alerts, params: { id: 5 }
        expect(response.body).to eq client.to_json
      end
    end

    describe '#update_relationship' do
      let(:relationship_service) { instance_double('Relationships::RelationshipService') }
      let(:client) { Clients::Client.new(identifier: 55) }
      let(:relationship) { Relationships::Relationship.new(id: 5) }

      it 'has a route' do
        expect(put: 'api/clients/55/update_relationship/5').to route_to(
          format: 'json',
          controller: 'api/clients',
          action: 'update_relationship',
          id: '55',
          relationship_id: '5',
          relationships: 'update_relationship'
        )
      end

      it 'updates a relationship' do
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
        allow(Relationships::RelationshipService).to receive(:new)
          .with(no_args).and_return(relationship_service)
        allow(relationship_service).to receive(:update_relationship)
          .with('55', '5', r_params, 'token')
          .and_return(relationship)
        request.session[:token] = 'token'
        put :update_relationship, params: { id: 55, relationship_id: 5,
                                            relationships: 'update_relationship',
                                            related_client_id: '355',
                                            type_code: '237',
                                            absent_parent_indicator: 'false',
                                            start_date: '2000-10-20',
                                            end_date: '2018-10-20',
                                            same_home_status: 'YES', format: 'json' }
        expect(response.body).to eq relationship.to_json
      end
    end
  end
end
