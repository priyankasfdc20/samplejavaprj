# frozen_string_literal: true

module Api
  class RelationshipsController < ActionController::API
    def show
      relationships_respository = Relationships::RelationshipRepository.new
      relationships = relationships_respository.get_id(params[:id], session[:token])
      render json: relationships
    end
  end
end
