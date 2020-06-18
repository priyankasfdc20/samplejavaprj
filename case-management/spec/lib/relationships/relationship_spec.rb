# frozen_string_literal: true

require 'spec_helper'
require 'rspec/dry/struct'

module Relationships
  describe Relationship do
    describe 'attributes' do
      subject { Relationship }
      it { is_expected.to have_attribute(:id, Types::String) }
      it { is_expected.to have_attribute(:client_id, Types::String.optional) }
      it { is_expected.to have_attribute(:related_client_id, Types::String.optional) }
      it { is_expected.to have_attribute(:type_code, Types::Int.optional) }
      it { is_expected.to have_attribute(:absent_parent_indicator, Types::Bool.optional) }
      it { is_expected.to have_attribute(:start_date, Types::String.optional) }
      it { is_expected.to have_attribute(:end_date, Types::String.optional) }
      it { is_expected.to have_attribute(:same_home_status, Types::String.optional) }
      it { is_expected.to have_attribute(:related_client, Clients::Client) }
    end
  end
end
