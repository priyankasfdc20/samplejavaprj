# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Relationships
  class Relationship < Dry::Struct
    constructor_type :schema
    attribute :id, Types::String
    attribute :client_id, Types::String.optional
    attribute :related_client_id, Types::String.optional
    attribute :type_code, Types::Int.optional
    attribute :absent_parent_indicator, Types::Bool.optional
    attribute :start_date, Types::String.optional
    attribute :end_date, Types::String.optional
    attribute :same_home_status, Types::String.optional
    attribute :related_client, Clients::Client
  end
end
