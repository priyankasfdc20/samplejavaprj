import React from 'react';
import RelationshipTable from './RelationshipTable';
import { shallow, mount } from 'enzyme';
import { BootstrapTable } from 'react-bootstrap-table';
import ButtonModal from '../button_modal/ButtonModal';

describe('<RelationshipTable />', () => {
  let component;
  const relatedClients = [
    {
      common_first_name: 'hello',
      common_last_name: 'world',
      identifier: 0,
      address: {
        street_name: 'foo',
        street_number: 'bar',
        city: 'sacramento',
        primary_phone: '808',
      },
      birth_dt: '1986-11-06',
      relationship_type: 'Aunt/Nephew (Maternal)',
    },
  ];
  const expectedRelatedClients = [
    {
      address: 'foo bar',
      age: '31',
      ageBirth: '31 | 1986-11-06',
      birth_dt: '11/6/1986',
      city: 'sacramento',
      common_first_name: 'hello',
      common_last_name: 'world',
      id: 0,
      identifier: 0,
      name: 'hello world',
      phone: '808',
      primaryRelationship: 'Aunt',
      relationship_type: 'Aunt/Nephew (Maternal)',
      secondaryRelationship: 'Nephew (Maternal)',
    },
  ];

  beforeEach(() => {
    component = shallow(<RelationshipTable />);
  });

  it('renders BootstrapTable Component', () => {
    expect(component.find('BootstrapTable').type()).toBe(BootstrapTable);
    expect(component.find('TableHeaderColumn').length).toEqual(5);
    expect(component.find('TableHeaderColumn').length).toEqual(5);
  });

  it('should pass the props to the bootstraptable from RelationshipTable ', () => {
    const wrapper = shallow(
      <RelationshipTable anchorId="Hello" relatedClients={relatedClients} />
    );
    expect(wrapper.find('BootstrapTable').length).toBe(1);
    expect(wrapper.find('BootstrapTable').prop('data')).toEqual(
      expectedRelatedClients
    );
  });

  describe('#actions', () => {
    const data = [{ related_client_id: 1 }];
    const relatedClient = [
      {
        common_first_name: 'hello',
        common_last_name: 'world',
        identifier: 0,
        address: {
          street_name: 'foo',
          street_number: 'bar',
          city: 'sacramento',
          primary_phone: '808',
        },
        birth_dt: '1986-11-06',
        relationship_type: 'Aunt/Nephew (Maternal)',
      },
    ];
    const wrapper = mount(
      <RelationshipTable
        anchorId="Hello"
        relatedClients={relatedClient}
        relationships={data}
      />
    );

    it('renders <ButtonModal />', () => {
      expect(wrapper.find(ButtonModal).length).toBe(1);
    });
  });

  describe('#expandComponent', () => {
    it('renders the expanded row', () => {
      expect(
        component.instance().expandComponent({ phone: '1', address: 'foo' })
      ).toEqual(
        <div className="expanded-row">
          <div className="col-md-4">1</div>
          <div className="col-md-4" />
          <div className="col-md-4">foo</div>
        </div>
      );
    });
  });

  describe('#expandColumnComponent', () => {
    it('renders the icon right', () => {
      expect(
        component.instance().expandColumnComponent({
          isExpandableRow: true,
          isExpanded: false,
        })
      ).toEqual(
        <div>
          <span
            className="glyphicon glyphicon-triangle-right"
            aria-hidden="true"
          />
        </div>
      );
    });

    it('renders the icon bottom ', () => {
      expect(
        component.instance().expandColumnComponent({
          isExpandableRow: true,
          isExpanded: true,
        })
      ).toEqual(
        <div>
          <span
            className="glyphicon glyphicon-triangle-bottom"
            aria-hidden="true"
          />
        </div>
      );
    });

    it('renders an empty icon since it is not expandable', () => {
      const props = [
        {
          id: '-1',
          common_first_name: 'hello',
          common_last_name: 'world',
          address: {
            street_name: 'foo',
            street_number: 'bar',
            city: 'sacramento',
            primary_phone: '808',
          },
          birth_dt: '1986-11-06',
          relationship_type: 'Aunt/Nephew (Maternal)',
        },
      ];
      const wrapper = mount(<RelationshipTable relatedClients={props} />);

      wrapper.instance().expandColumnComponent({
        isExpandableRow: false,
        isExpanded: true,
      });
      expect(wrapper.find('.glyphicon glyphicon-triangle-right').exists()).toBe(
        false
      );
    });
  });

  describe('#isExpandableRow', () => {
    it('returns true if there is an id', () => {
      expect(component.instance().isExpandableRow({ id: 'A1X34' })).toBe(true);
    });

    it('returns false if there is no id', () => {
      expect(component.instance().isExpandableRow({})).toBe(false);
    });

    it('simulates a click on column and <ExpandComponent /> is expanded', () => {
      const wrapper = mount(
        <RelationshipTable relatedClients={relatedClients} />
      );

      expect(wrapper.find('ExpandComponent').prop('hidden')).toBe(true);
      wrapper
        .find('td')
        .first()
        .prop('onClick')();
      wrapper.update();
      expect(wrapper.find('ExpandComponent').prop('hidden')).toBe(false);
    });
  });
});
