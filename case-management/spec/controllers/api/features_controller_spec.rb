# frozen_string_literal: true

require 'feature/testing'
require 'rails_helper'

module Api
  describe FeaturesController do
    describe '#index' do
      it 'has a route' do
        expect(get: 'api/features').to route_to(
          action: 'index',
          controller: 'api/features',
          format: 'json'
        )
      end

      it 'returns active features' do
        Feature.run_with_activated(:authentication,
                                   :dashboard_case_actions,
                                   :dashboard_placement_tool) do
          get :index
          expect(response.body).to eq '{"authentication":true,'\
            '"dashboard_case_actions":true,'\
            '"dashboard_placement_tool":true}'
        end
      end
    end
  end
end
