# frozen_string_literal: true

module Api
  class FeaturesController < ActionController::API
    def index
      features = Hash[Feature.active_features.collect { |feature| [feature, true] }]
      render json: features
    end
  end
end
