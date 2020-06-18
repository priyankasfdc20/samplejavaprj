# frozen_string_literal: true

module Relationships
  class RelationshipService
    def initialize(address_repository = Addresses::AddressRepository.new,
                   relationships_repository = RelationshipRepository.new,
                   address_geo_provider = Placements::AddressGeoProvider.new)
      @address_repository = address_repository
      @address_geo_provider = address_geo_provider
      @relationships_repository = relationships_repository
    end

    def get_addresses(client_id, token)
      relationships = @relationships_repository.get_id(client_id, token)
      relationships_decorate = decorate_with_relationship_type(relationships)
      related_clients = relationships_decorate.map(&:related_client)
      include_child_address(related_clients, client_id)
      decorate_with_addresses(related_clients, token)
    end

    def update_relationship(client_id, relationship_id, parameters, token)
      updated_relationship = @relationships_repository.update_relationship(client_id,
                                                                           relationship_id,
                                                                           parameters, token)
      decorate_with_relationship_type(updated_relationship)
    end

    private

    def decorate_with_relationship_type(relationships)
      relationships.map do |relationship|
        relationship_attribute = relationship.to_h
        client = relationship.related_client.to_h
        type = relationship.type_code
        client[:relationship_type] = Relationships::RelationshipType.new.relationship_type(type)
        relationship_attribute[:related_client] = Clients::Client.new(client.compact)
        Relationships::Relationship.new(relationship_attribute.compact)
      end
    end

    def include_child_address(related_clients, client_id)
      related_clients << Clients::Client.new(identifier: client_id)
    end

    def decorate_with_addresses(related_clients, token)
      related_clients.map do |client|
        client_attributes = client.to_h
        client_attributes[:address] = @address_repository.addresses_by_client_id(client.identifier,
                                                                                 token).first
        next Clients::Client.new(client_attributes.compact) if client_attributes[:address].nil?
        client_attributes[:address] = @address_geo_provider.provide_geo(client_attributes[:address],
                                                                        token)
        Clients::Client.new(client_attributes.compact)
      end
    end
  end
end
