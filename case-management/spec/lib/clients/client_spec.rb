# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Clients
  describe Client do
    describe 'attributes' do
      subject { Client }
      it { is_expected.to have_attribute(:name_prefix_description, Types::String.optional) }
      it { is_expected.to have_attribute(:common_first_name, Types::String.optional) }
      it { is_expected.to have_attribute(:common_middle_name, Types::String.optional) }
      it { is_expected.to have_attribute(:common_last_name, Types::String.optional) }
      it { is_expected.to have_attribute(:suffix_title_description, Types::String.optional) }
      it { is_expected.to have_attribute(:social_security_number, Types::String.optional) }
      it { is_expected.to have_attribute(:birth_dt, Types::String.optional) }
      it { is_expected.to have_attribute(:adopted_age, Types::String.optional) }
      it { is_expected.to have_attribute(:identifier, Types::String.optional) }
      it { is_expected.to have_attribute(:alien_registration_number, Types::String.optional) }
      it { is_expected.to have_attribute(:driver_licens_number, Types::String.optional) } # API typo
      it { is_expected.to have_attribute(:driver_license_state_code_type, Types::String.optional) }
      it { is_expected.to have_attribute(:gender_code, Types::String.optional) }
      it { is_expected.to have_attribute(:material_status_type, Types::String.optional) }
      it { is_expected.to have_attribute(:ageUnit, Types::String.optional) }
      it { is_expected.to have_attribute(:name_type, Types::String.optional) }
      it { is_expected.to have_attribute(:relationship_type, Types::String.optional) }
      it { is_expected.to have_attribute(:address, Addresses::Address) }
    end
  end
end
