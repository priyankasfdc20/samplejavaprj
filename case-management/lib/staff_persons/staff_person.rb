# frozen_string_literal: true

require 'dry-struct'
require 'dry-types'

module Types
  include Dry::Types.module
end

module StaffPersons
  class StaffPerson < Dry::Struct
    constructor_type :schema
    attribute :staff_id, Types::String.optional
    attribute :end_date, Types::String.optional
    attribute :first_name, Types::String.optional
    attribute :job_title, Types::String.optional
    attribute :last_name, Types::String.optional
    attribute :middle_initial, Types::String.optional
    attribute :name_prefix, Types::String.optional
    attribute :phone_number, Types::String.optional
    attribute :phone_ext, Types::String.optional
    attribute :start_date, Types::String.optional
    attribute :name_suffix, Types::String.optional
    attribute :telecommuter_indicator, Types::Bool.optional
    attribute :cws_office, Types::String.optional
    attribute :availability_and_location_description, Types::String.optional
    attribute :ssrs_licensing_worker_id, Types::String.optional
    attribute :county_code, Types::String.optional
    attribute :duty_worker_indicator, Types::Bool.optional
    attribute :cws_office_address, Types::String.optional
    attribute :email_address, Types::String.optional
  end
end
