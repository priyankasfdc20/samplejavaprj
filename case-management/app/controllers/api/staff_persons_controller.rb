# frozen_string_literal: true

module Api
  class StaffPersonsController < ActionController::API
    def current
      token = session[:token]
      staff_person = StaffPersons::StaffPersonService.new.get(token)
      render json: staff_person
    end
  end
end
