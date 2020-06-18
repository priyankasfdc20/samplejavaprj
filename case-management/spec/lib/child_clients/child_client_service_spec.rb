# frozen_string_literal: true

require 'spec_helper'

module ChildClients
  describe ChildClientService do
    let(:child_client_repository) { instance_double('ChildClients::ChildClientRepository') }
    let(:token) { 'sauron' }
    let(:child_client) { child_client_repository.show('starlord', token) }
    let(:ethnicity_service) do
      ChildClientService.new(child_client_repository)
    end

    describe '#get_client_info' do
      context 'with child and ethnicity type code ' do
        it 'returns clients with other ethnicity type' do
          allow(child_client_repository)
            .to receive(:show)
            .with('starlord', token)
            .and_return(ChildClients::ChildClient.new(other_ethnicity_types: [820],
                                                      primary_ethnicity_type: 824))
          expect(ethnicity_service.get_client_info('starlord', token))
            .to eq ChildClient.new(other_ethnicity: ['Alaskan Native*'],
                                   other_ethnicity_types: [820],
                                   primary_ethnicity_type: 824,
                                   primary_race: 'Cambodian*')
        end
      end
    end
    context 'with child and ethnicity type code ' do
      it 'returns clients with no other ethnicity type' do
        allow(child_client_repository)
          .to receive(:show)
          .with('starlord', token)
          .and_return(ChildClients::ChildClient.new(primary_ethnicity_type: 824))
        expect(ethnicity_service.get_client_info('starlord', token))
          .to eq ChildClient.new(other_ethnicity: [],
                                 primary_ethnicity_type: 824,
                                 primary_race: 'Cambodian*')
      end
    end
  end
end
