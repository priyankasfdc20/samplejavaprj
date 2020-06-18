# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'
require 'referrals/referral'

module Referrals
  describe Referral do
    describe 'attributes' do
      subject { Referral }
      it { is_expected.to have_attribute(:identifier, Types::String) }
      it { is_expected.to have_attribute(:referral_name, Types::String) }
      it { is_expected.to have_attribute(:received_date, Types::String) }
      it { is_expected.to have_attribute(:received_time, Types::String) }
      it { is_expected.to have_attribute(:referral_response_type, Types::Int) }
      it { is_expected.to have_attribute(:assignment_identifier, Types::String) }
      it { is_expected.to have_attribute(:assignment_type, Types::String.optional) }
    end
  end
end
