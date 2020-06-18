# frozen_string_literal:true

require 'spec_helper'

module ChildClients
  describe ChildClientEthnicityType do
    context 'Other ethnicity code exist' do
      it 'looks up a other ethnicity type code' do
        expect(ChildClientEthnicityType.new.ethnicity_type(820)).to eq 'Alaskan Native*'
        expect(ChildClientEthnicityType.new.ethnicity_type(821)).to eq 'American Indian*'
        expect(ChildClientEthnicityType.new.ethnicity_type(822)).to eq 'Asian Indian*'
      end
    end

    context 'other ethnicity code does not exist' do
      it 'looks up a other ethnicity type code' do
        expect(ChildClientEthnicityType.new.ethnicity_type(0)).to eq ''
      end
    end
  end
end
