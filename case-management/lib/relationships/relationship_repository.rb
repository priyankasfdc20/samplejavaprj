# frozen_string_literal: true

module Relationships
  class RelationshipRepository
    def initialize(http_service = Infrastructure::HttpService.new)
      @http_service = http_service
    end

    def get_id(id, token)
      response = @http_service.get("/clients/#{id}/relationships", token)
      response.body.map { |result| Relationship.new(result) }
    end

    def update_relationship(id, relationship_id, parameters, token)
      response = @http_service.put("/clients/#{id}/relationships/#{relationship_id}",
                                   parameters, token)
      [Relationship.new(response.body)]
    end
  end
end
