# frozen_string_literal: true

require 'staff_persons/staff_person'

module StaffPersons
  describe StaffPersonRepository do
    let(:http_service) { instance_double('Infrastructure::Service') }
    let(:staff_person_repository) { StaffPersonRepository.new(http_service) }
    let(:token) { 'good_token' }

    describe '#get' do
      let(:response) { instance_double('Faraday::Response') }

      context 'with no staff person found' do
        it 'returns nil when status is not 200' do
          allow(response).to receive(:status).and_return(404)
          allow(http_service).to receive(:get)
            .with('/staffpersons/nonExistent', token)
            .and_return(response)
          expect(staff_person_repository.get('nonExistent', token)).to eq nil
        end
      end

      context 'with existent staff person' do
        it 'returns staff person' do
          allow(response).to receive(:status).and_return(200)
          allow(response).to receive(:body).and_return(staff_id: 'aa1')
          allow(http_service).to receive(:get)
            .with('/staffpersons/aa1', token)
            .and_return(response)
          expect(staff_person_repository.get('aa1', token))
            .to eq StaffPerson.new(staff_id: 'aa1')
        end
      end
    end
  end
end
