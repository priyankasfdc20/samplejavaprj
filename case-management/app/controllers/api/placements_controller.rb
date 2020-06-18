# frozen_string_literal: true

module Api
  class PlacementsController < ActionController::API
    def clients_by_related_client_id
      relationship_service = Relationships::RelationshipService.new
      placements = relationship_service.get_addresses(params[:client_id], session[:token])
      render json: placements
    end
  end
end
