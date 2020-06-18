# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module StaffPersons
  describe StaffPerson do
    describe 'attributes' do
      subject { StaffPerson }
      it { is_expected.to have_attribute(:staff_id, Types::String.optional) }
      it { is_expected.to have_attribute(:end_date, Types::String.optional) }
      it { is_expected.to have_attribute(:first_name, Types::String.optional) }
      it { is_expected.to have_attribute(:job_title, Types::String.optional) }
      it { is_expected.to have_attribute(:last_name, Types::String.optional) }
      it { is_expected.to have_attribute(:middle_initial, Types::String.optional) }
      it { is_expected.to have_attribute(:name_prefix, Types::String.optional) }
      it { is_expected.to have_attribute(:phone_number, Types::String.optional) }
      it { is_expected.to have_attribute(:phone_ext, Types::String.optional) }
      it { is_expected.to have_attribute(:start_date, Types::String.optional) }
      it { is_expected.to have_attribute(:name_suffix, Types::String.optional) }
      it { is_expected.to have_attribute(:telecommuter_indicator, Types::Bool.optional) }
      it { is_expected.to have_attribute(:cws_office, Types::String.optional) }
      it do
        is_expected
          .to have_attribute(:availability_and_location_description, Types::String.optional)
      end
      it { is_expected.to have_attribute(:ssrs_licensing_worker_id, Types::String.optional) }
      it { is_expected.to have_attribute(:county_code, Types::String.optional) }
      it { is_expected.to have_attribute(:duty_worker_indicator, Types::Bool.optional) }
      it { is_expected.to have_attribute(:cws_office_address, Types::String.optional) }
      it { is_expected.to have_attribute(:email_address, Types::String.optional) }
    end
  end
end
