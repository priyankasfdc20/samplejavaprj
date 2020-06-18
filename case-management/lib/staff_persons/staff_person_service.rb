# frozen_string_literal: true

module StaffPersons
  class StaffPersonService
    def initialize(staff_person_repository = StaffPersons::StaffPersonRepository.new,
                   perry_account_service = Perry::AccountService.new)
      @staff_person_repository = staff_person_repository
      @perry_account_service = perry_account_service
    end

    def get(token)
      perry_account = @perry_account_service.get_perry_account(token)
      @staff_person_repository.get(perry_account.staff_id, token)
    end
  end
end
