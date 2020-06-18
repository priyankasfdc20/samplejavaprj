import React from 'react';
import { shallow, mount } from 'enzyme';
import EditRelationsCard from './EditRelationsCard.js';

describe('EditRelationsCard', () => {
  let wrapper;
  let data = {
    absent_parent_indicator: false,
    client_id: 'DZGcEEgaa1',
    id: 'K76B3Haaa1',
    related_client_id: 'JoLW4VKaa1',
    relationship_type: 'Aunt/Nephew (Maternal)',
    type_code: 233,
    same_home_status: 'YES',
    related_client: {
      common_first_name: 'Gandalf',
      common_last_name: 'Wizard',
      address: {
        street_name: 'foo',
        street_number: 'bar',
        city: 'sacramento',
        primary_phone: '808',
      },
      birth_dt: '1935-03-13',
      gender_code: 'M',
    },
  };

  const clientFrodo = {
    identifier: 'DZGcEEgaa1',
    birth_dt: '2003-03-13',
    common_first_name: 'Froddo',
    common_last_name: 'Baggins',
    gender_code: 'M',
  };

  beforeEach(() => {
    wrapper = shallow(
      <EditRelationsCard
        client={clientFrodo}
        relationship={data}
        update={() => {}}
      />
    );
  });

  it('DropDownField ,CheckBox, DatePicker exists', () => {
    expect(wrapper.find('DropDownField').length).toEqual(1);
    expect(wrapper.find('CheckBoxRadio').length).toEqual(2);
    expect(wrapper.find('DateTimePicker').length).toEqual(2);
  });

  describe('#handleAbsentParent', () => {
    it('sets the absent parent indicator checkbox', () => {
      expect(
        wrapper.instance().state.relationship.absent_parent_indicator
      ).toEqual(false);
      wrapper.instance().handleAbsentParent();
      expect(
        wrapper.instance().state.relationship.absent_parent_indicator
      ).toEqual(true);
    });
  });

  describe('#handleDropDownChange() function', () => {
    it('sets the dropdown relationship state', () => {
      const expectedValue = { ...data, relationship_type: 'Brother/Sister' };
      const myFunction = wrapper
        .instance()
        .handleDropdownChange('relationship_type');

      expect(() => myFunction({ value: 'Brother/Sister' })).not.toThrow();
      expect(wrapper.instance().state.relationship).toEqual(expectedValue);
    });

    it('sets the absent parent indicator to false when is disabled', () => {
      const expectedValue = {
        ...data,
        relationship_type: 'Brother/Sister',
        absent_parent_indicator: false,
      };
      const myFunction = wrapper
        .instance()
        .handleDropdownChange('relationship_type');

      wrapper.instance().handleAbsentParent();
      expect(() => myFunction({ value: 'Brother/Sister' })).not.toThrow();
      expect(wrapper.instance().state.relationship).toEqual(expectedValue);
    });
  });

  describe('#handleSameHomeStatus', () => {
    it('sets the same home status checkbox', () => {
      expect(wrapper.instance().state.relationship.same_home_status).toEqual(
        'YES'
      );
      wrapper.instance().handleSameHomeStatus();
      expect(wrapper.instance().state.relationship.same_home_status).toEqual(
        'NO'
      );
    });
  });

  describe('#getRelationshipType', () => {
    it('should return the relationship type constant given a type code', () => {
      const type = {
        label: 'Father/Daughter (Birth)',
        logical_code: 'F',
        gender_code: 'Mf',
        value: 205,
      };

      expect(wrapper.instance().getRelationshipType(205)).toEqual(type);
    });

    it('should return undefined when relationship type not found', () => {
      expect(wrapper.instance().getRelationshipType(1)).toBe(undefined);
    });
  });

  describe('#toggleAbsentParentIndicator', () => {
    describe('checkbox disabled is set to false', () => {
      it('should return false when it have a father, mother or parent string on secondary', () => {
        const typeMother = { value: 247, label: 'Daughter/Mother (Birth)' };
        const typeParent = { value: 273, label: 'Son/Non-Custodial Parent' };

        expect(wrapper.instance().toggleAbsentParent(typeMother)).toBe(false);
        expect(wrapper.instance().toggleAbsentParent(typeParent)).toBe(false);
      });

      it('should render the checkbox props disabled as false', () => {
        const wrapper = mount(
          <EditRelationsCard
            client={clientFrodo}
            relationship={data}
            update={() => {}}
          />
        );

        wrapper.setState({ relationship: { ...data, type_code: 190 } });
        wrapper.update();

        expect(
          wrapper.find('input').find('#absent_parent_indicator').length
        ).toBe(1);
        expect(
          wrapper.find('input#absent_parent_indicator').prop('disabled')
        ).toBe(false);
      });
    });

    describe('checkbox disabled is set to true', () => {
      it('should return true when it has no father, mother or parent string secondary', () => {
        const type = { value: 216, label: 'Godparent/Godchild' };

        expect(wrapper.instance().toggleAbsentParent(type)).toBe(true);
      });

      it('should render the checkbox props disabled as true', () => {
        const wrapper = mount(
          <EditRelationsCard
            client={clientFrodo}
            relationship={data}
            update={() => {}}
          />
        );

        expect(
          wrapper.find('input').find('#absent_parent_indicator').length
        ).toBe(1);

        expect(
          wrapper.find('input#absent_parent_indicator').prop('disabled')
        ).toBe(true);
      });
    });
  });

  describe('#updateState', () => {
    it('updates the state', () => {
      const update = {
        ...data,
        relationship_type: 'Son/De Facto Parent',
      };

      expect(wrapper.instance().state.relationship).toEqual(data);
      wrapper.instance().updateState(update);
      expect(wrapper.instance().state.relationship).toEqual(update);
    });
  });

  it('should return undefined when relationship type not found', () => {
    expect(wrapper.instance().getRelationshipType(1)).toBe(undefined);
  });
});
