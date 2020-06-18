# frozen_string_literal: true

module ChildClients
  class ChildClientService
    def initialize(child_client_repository = ChildClientRepository.new)
      @child_client_repository = child_client_repository
    end

    def get_client_info(id, token)
      child_client = @child_client_repository.show(id, token)
      map_with_ethnicity_type(child_client)
    end

    private

    def map_with_ethnicity_type(child_client)
      ethnicities = []
      child_attribute = child_client.to_h
      primary = child_client.primary_ethnicity_type
      child_attribute[:primary_race] = ChildClientEthnicityType.new.ethnicity_type(primary)
      other_ethnicities = child_client.other_ethnicity_types
      other_ethnicities&.map do |ethnicity|
        ethnicities.push(ChildClientEthnicityType.new.ethnicity_type(ethnicity))
      end
      child_attribute[:other_ethnicity] = ethnicities
      ChildClient.new(child_attribute.compact)
    end
  end
end
