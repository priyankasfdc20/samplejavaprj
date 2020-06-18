# frozen_string_literal: true

module StaffPersons
  describe StaffPersonService do
    let(:staff_person_repository) { instance_double('StaffPersons::StaffPersonRepository') }
    let(:perry_account_service) { instance_double('Perry::AccountService') }
    let(:test_subject) do
      StaffPersons::StaffPersonService.new(staff_person_repository, perry_account_service)
    end

    describe '#get' do
      context 'with logged in user' do
        it 'returns staff person' do
          token = 'any_token'
          perry_account = Perry::Account.new(staff_id: 'aa1')
          staff_person = StaffPerson.new(staff_id: 'aa1')
          allow(perry_account_service).to receive(:get_perry_account)
            .with(token)
            .and_return(perry_account)
          allow(staff_person_repository).to receive(:get)
            .with('aa1', token)
            .and_return(staff_person)
          expect(test_subject.get(token)).to eq staff_person
        end
      end
    end
  end
end
