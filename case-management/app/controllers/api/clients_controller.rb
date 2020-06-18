# frozen_string_literal: true

module Api
  class ClientsController < ActionController::API
    def show
      clients = Clients::ClientRepository.new.show(params[:id], session[:token])
      render json: clients
    end

    def safety_alerts
      client_safety_alert_repo = Clients::ClientRepository.new
      client_safety_alerts = client_safety_alert_repo.safety_alerts(params[:id], session[:token])
      render json: client_safety_alerts
    end

    def update_relationship
      remap_client_relationship_ids
      relationship_service = Relationships::RelationshipService.new
      relationship_params = Relationships::Relationship.new(allowed_params_for_update).to_h.compact
      updated_relationship = relationship_service.update_relationship(params[:client_id],
                                                                      params[:id],
                                                                      relationship_params,
                                                                      session[:token])
      render json: updated_relationship
    end

    private

    def allowed_params_for_update
      params.permit(Relationships::Relationship.attribute_names).to_h
    end

    def remap_client_relationship_ids
      params[:client_id] = params[:id]
      params[:id] = params[:relationship_id]
    end
  end
end
