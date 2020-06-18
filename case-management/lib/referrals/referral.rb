# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module Referrals
  class Referral < Dry::Struct
    constructor_type :schema

    attribute :identifier, Types::String
    attribute :referral_name, Types::String
    attribute :received_date, Types::String
    attribute :received_time, Types::String
    attribute :referral_response_type, Types::Int
    attribute :assignment_identifier, Types::String
    attribute :assignment_type, Types::String.optional
  end
end
