# frozen_string_literal: true

require 'json'

module Perry
  class AccountService
    def initialize(security_gateway = Infrastructure::SecurityGateway.new)
      @security_gateway = security_gateway
    end

    def get_perry_account(token)
      perry_account_response = @security_gateway.validate_token(token)
      perry_account_json = JSON.parse(perry_account_response, symbolize_names: true)
      perry_account_json[:staff_id] = perry_account_json[:staffId]
      perry_account_json.delete(:staffId)
      Perry::Account.new(perry_account_json)
    end
  end
end
