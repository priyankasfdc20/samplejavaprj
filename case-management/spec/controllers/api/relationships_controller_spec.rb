# frozen_string_literal: true

require 'rails_helper'

module Api
  describe RelationshipsController do
    describe '#show' do
      let(:relationship_repository) { instance_double('Relationships::RelationshipRepository') }
      let(:relationships) { Relationships::Relationship.new(identifier: 5) }

      it 'has a route' do
        expect(get: 'api/relationships/42').to route_to(
          controller: 'api/relationships',
          action: 'show',
          id: '42',
          format: 'json'
        )
      end

      it 'returns a relationship' do
        allow(Relationships::RelationshipRepository).to receive(:new)
          .with(no_args).and_return(relationship_repository)
        allow(relationship_repository).to receive(:get_id)
          .with('5', 'token').and_return(relationships)
        request.session[:token] = 'token'
        get :show, params: { id: 5 }
        expect(response.body).to eq relationships.to_json
      end
    end
  end
end
