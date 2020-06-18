# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe FerbApiHttpService do
    let(:connection) { instance_double('Faraday::Connection') }

    describe '#get' do
      context 'returns a valid API response' do
        it 'makes a get request' do
          allow(Faraday).to receive(:new)
            .with(url: 'https://ferb-api.test')
            .and_return(connection)
          expect(connection).to receive(:get).with('/resource?token=123')
          Infrastructure::FerbApiHttpService.new.get('/resource', '123')
        end

        it 'sets json and uses the default adapter' do
          allow(Faraday).to receive(:new)
            .with(url: 'https://ferb-api.test')
            .and_yield(connection).and_return(connection)
          expect(connection).to receive(:response)
            .with(:json, parser_options: { symbolize_names: true })
          expect(connection).to receive(:adapter).with(Faraday.default_adapter)
          allow(connection).to receive(:get).with('/resource?token=123')
          Infrastructure::FerbApiHttpService.new.get('/resource', '123')
        end
      end

      context 'returns an API error' do
        it 'returns a 404' do
          allow(Faraday).to receive(:new).with(url: 'https://ferb-api.test')
            .and_yield(connection).and_return(connection)
          allow(connection)
            .to receive(:response)
            .with(:json, parser_options: { symbolize_names: true })
            .and_raise('error message')
          expect(Infrastructure::FerbApiHttpService.new
            .get('/resource', '123').status).to eq 404
        end
      end
    end
  end
end
