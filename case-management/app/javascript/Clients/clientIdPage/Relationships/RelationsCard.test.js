import React from 'react';
import { shallow } from 'enzyme';
import RelationsCard from './RelationsCard.js';
import RelationshipTable from './_components/relationship_table';

describe('RelatedClientCard', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <RelationsCard anchorId="Hello" fetchRelatedClients={() => {}} />
    );
  });

  it('renders', () => {
    expect(() => component).not.toThrow();
  });

  it('renders <RelationshipTable/> Component', () => {
    expect(component.find('RelationshipTable').length).toBe(1);
    expect(component.find('RelationshipTable').type()).toBe(RelationshipTable);
  });
});
