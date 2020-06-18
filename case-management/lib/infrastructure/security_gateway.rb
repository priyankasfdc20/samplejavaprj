# frozen_string_literal: true

module Infrastructure
  class SecurityGateway
    def validate_token(token)
      response = Faraday.get(validation_url(token))
      response.body if response.status == 200
    end

    def fetch_new_token(access_code)
      response = Faraday.get(token_generation_url(access_code))
      response.body if response.status == 200
    end

    private

    def validation_url(token)
      perry_api_base_url = Rails.configuration.micro_services['perry_api_base_url']
      "#{perry_api_base_url}/authn/validate?token=#{token}"
    end

    def token_generation_url(access_code)
      perry_api_base_url = Rails.configuration.micro_services['perry_api_base_url']
      "#{perry_api_base_url}/authn/token?accessCode=#{access_code}"
    end
  end
end
