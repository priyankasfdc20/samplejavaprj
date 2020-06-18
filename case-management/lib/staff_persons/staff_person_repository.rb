# frozen_string_literal: true

module StaffPersons
  class StaffPersonRepository
    def initialize(http_service = Infrastructure::FerbApiHttpService.new)
      @http_service = http_service
    end

    def get(id, token)
      response = @http_service.get("/staffpersons/#{id}", token)
      return nil if response.status != 200
      StaffPerson.new(response.body)
    end
  end
end
