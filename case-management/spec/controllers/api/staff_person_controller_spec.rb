# frozen_string_literal: true

require 'rails_helper'

module Api
  describe StaffPersonsController do
    describe '#current' do
      let(:staff_person_service) { instance_double('StaffPersons::StaffPersonService') }
      let(:staff_person) { StaffPersons::StaffPerson.new(staff_id: '0X5') }

      it 'has a route' do
        expect(get: 'api/staff_persons/current').to route_to(
          format: 'json',
          controller: 'api/staff_persons',
          action: 'current'
        )
      end

      it 'returns a staff person' do
        allow(StaffPersons::StaffPersonService).to receive(:new)
          .with(no_args).and_return(staff_person_service)
        allow(staff_person_service).to receive(:get).with('token').and_return(staff_person)
        request.session[:token] = 'token'
        get :current
        expect(response.body).to eq staff_person.to_json
      end
    end
  end
end
