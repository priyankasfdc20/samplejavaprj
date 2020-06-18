# frozen_string_literal: true

require 'rails_helper'

module Api
  describe AccountController do
    describe '#current' do
      let(:account_service) { instance_double('Perry::AccountService') }
      let(:account) { Perry::Account.new(staff_id: '0X5') }

      it 'has a route' do
        expect(get: 'api/account').to route_to(
          format: 'json',
          controller: 'api/account',
          action: 'index'
        )
      end

      it 'returns a logged in user account' do
        allow(Perry::AccountService).to receive(:new)
          .with(no_args).and_return(account_service)
        allow(account_service).to receive(:get_perry_account)
          .with('token').and_return(account)
        request.session[:token] = 'token'
        get :index
        expect(response.body).to eq account.to_json
      end
    end
  end
end
