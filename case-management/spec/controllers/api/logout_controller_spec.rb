# frozen_string_literal: true

require 'rails_helper'

module Api
  describe LogoutController do
    it 'has a route' do
      expect(get: 'api/logout').to route_to(
        format: 'json',
        controller: 'api/logout',
        action: 'index'
      )
    end

    it 'invalidates session and redirects to perry with clearing accessCode param' do
      request.session[:token] = 'token'
      headers = { HTTP_REFERER: 'http://host.name/123?accessCode=code' }
      request.headers.merge! headers
      get :index
      expect(request.session[:token]).to eq nil
      expect(response.status).to eq 301
      expect(response.location).to eq 'https://perry.test/authn/logout?callback=http://host.name/123'
    end
  end
end
