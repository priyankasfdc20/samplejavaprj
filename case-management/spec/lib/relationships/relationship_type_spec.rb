# frozen_string_literal:true

require 'spec_helper'

module Relationships
  describe RelationshipType do
    context 'relationship code exist' do
      it 'looks up a Relationship type code' do
        expect(RelationshipType.new.relationship_type(175)).to eq 'Aunt/Nephew (Maternal)'
        expect(RelationshipType.new.relationship_type(259)).to eq 'Nephew/Great-Uncle (Maternal)'
        expect(RelationshipType.new.relationship_type(6361)).to eq 'Mother/Son (Presumed)'
      end
    end

    context 'type code does not exist' do
      it 'looks up a Relationship type code' do
        expect(RelationshipType.new.relationship_type(0)).to eq ''
      end
    end
  end
end
