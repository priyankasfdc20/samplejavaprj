# frozen_string_literal: true

module Api
  class ChildClientsController < ActionController::API
    def show
      childclient = ChildClients::ChildClientService.new
      child_client = childclient.get_client_info(params[:id], session[:token])
      render json: child_client
    end

    def csec
      child_client_repo = ChildClients::ChildClientRepository.new
      child_clients = child_client_repo.child_clients_by_csec(params[:id], session[:token])
      render json: child_clients
    end

    def indian_ancestry_notifications
      indian_ancestry = ChildClients::ChildClientRepository.new
      client_indian = indian_ancestry
                      .child_clients_by_indian_ancestry_notifications(params[:id], session[:token])
      render json: client_indian
    end
  end
end
