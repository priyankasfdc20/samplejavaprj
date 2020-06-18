import React from 'react';
import { shallow } from 'enzyme';
import RaceAndEthnicity from './RaceAndEthnicity';

describe('<RaceAndEthnicity />', () => {
  let clientPage;

  beforeEach(
    () => (clientPage = shallow(<RaceAndEthnicity childClient={{}} />))
  );

  describe('#handleDropDownChange()  function', () => {
    it('should an event handler that sets state', () => {
      const expectedValue = { myKey: 'foo' };
      const instance = clientPage.instance();
      const myFunction = instance.handleDropdownChange('myKey');
      expect(() => myFunction({ value: 'foo' })).not.toThrow();
      expect(instance.state.childClient).toEqual(expectedValue);
    });
  });

  describe('#handleUnableToDetermine()  function', () => {
    it('should an event handler that sets state', () => {
      const expectedValue = { myKey: 'foo' };
      const instance = clientPage.instance();
      const myFunction = instance.handleUnableToDetermine('myKey');
      expect(() => myFunction({ value: 'foo' })).not.toThrow();
      expect(instance.state.childClient).toEqual(expectedValue);
    });
  });

  describe('#handleOtherEthnicity()  function', () => {
    it('should an event handler that sets state', () => {
      const expectedValue = { other_ethnicity: { 0: 'Asian', 1: 'American' } };
      const instance = clientPage.instance();
      const myFunction = instance.handleOtherEthnicity('other_ethnicity');
      expect(() => myFunction({ 0: 'Asian', 1: 'American' })).not.toThrow();
      expect(instance.state.childClient).toEqual(expectedValue);
    });
  });

  describe('#handlePrimaryRace()  function', () => {
    it('should an event handler that sets state unableToDetermine to true', () => {
      const expectedChildClient = {
        primary_race: 'Unable to Determine*',
      };
      const instance = clientPage.instance();
      const myFunction = instance.handlePrimaryRace('primary_race');
      expect(() => myFunction({ value: 'Unable to Determine*' })).not.toThrow();
      expect(instance.state.unableToDetermine).toBe(true);
      expect(instance.state.childClient).toEqual(expectedChildClient);
    });

    it('should an event handler that sets state unableToDetermine to false', () => {
      const expectedChildClient = {
        primary_race: 'Asian*',
      };
      const instance = clientPage.instance();
      const myFunction = instance.handlePrimaryRace('primary_race');
      expect(() => myFunction({ value: 'Asian*' })).not.toThrow();
      expect(instance.state.unableToDetermine).toBe(false);
      expect(instance.state.childClient).toEqual(expectedChildClient);
    });
  });

  describe('#componentWillReceiveProps()', () => {
    it('should change the state', () => {
      const value = {
        id: '42',
        other_ethnicity: [],
        hispanic_origin_code: 'Y',
        icwa_eligibility_code: 'N',
      };
      const wrapper = shallow(
        <RaceAndEthnicity
          childClient={
            ({ foo: 'bar' }, { hispanic: 'Y' }, { other_ethnicity: [] })
          }
        />
      );
      wrapper.setProps({ childClient: value });
      expect(wrapper.state('childClient')).toEqual(value);
      expect(wrapper.state('hispanic')).toEqual('Yes');
      expect(wrapper.state('selected')).toEqual('No');
    });
  });

  describe('#addEthnicity()', () => {
    describe('Enable or disable the addEthnicity button', () => {
      it('should return enabled Button', () => {
        const wrapper = shallow(<RaceAndEthnicity />);
        wrapper.setState({
          childClient: { primary_race: 'white' },
        });
        const instance = wrapper.instance();
        instance.addEthnicity();
        expect(wrapper.find('Button').prop('disabled')).toBe(false);
      });

      it('should return disabled Button', () => {
        const wrapper = shallow(<RaceAndEthnicity />);
        wrapper.setState({
          childClient: { primary_race: 'Declines to state*' },
        });
        const instance = wrapper.instance();
        instance.addEthnicity();
        expect(wrapper.find('Button').prop('disabled')).toBe(true);
      });

      it('should return disabled Button when unableToDetermine is true', () => {
        const wrapper = shallow(<RaceAndEthnicity />);
        wrapper.setState({
          unableToDetermine: true,
        });
        const instance = wrapper.instance();
        instance.addEthnicity();
        expect(wrapper.find('Button').prop('disabled')).toBe(true);
      });
    });
  });

  describe('#valueToString', () => {
    let instance;
    beforeEach(() => {
      clientPage = shallow(
        <RaceAndEthnicity
          childClient={({ primary_race: 'Asian' }, { other_ethnicity: [] })}
        />
      );
      instance = clientPage.instance();
    });

    it('should set received value to Yes', () =>
      expect(instance.valueToString('Y')).toEqual('Yes'));

    it('should set received value to No', () =>
      expect(instance.valueToString('N')).toEqual('No'));

    it('should set received value to Unable to determine', () =>
      expect(instance.valueToString('U')).toEqual('Unable to Determine'));

    it('should set received value to Declined to State', () =>
      expect(instance.valueToString('Z')).toEqual('Declined to State'));

    it('should set received value to defalut value', () =>
      expect(instance.valueToString('Foo')).toEqual([]));
  });

  describe('#icwaToString', () => {
    let instance;
    beforeEach(() => {
      clientPage = shallow(
        <RaceAndEthnicity
          childClient={({ primary_race: 'Asian' }, { other_ethnicity: [] })}
        />
      );
      instance = clientPage.instance();
    });

    it('should set received value to Yes', () =>
      expect(instance.icwaToString('Y')).toEqual('Yes'));

    it('should set received value to No', () =>
      expect(instance.icwaToString('N')).toEqual('No'));

    it('should set received value to Not Asked', () =>
      expect(instance.icwaToString('U')).toEqual('Not Asked'));

    it('should set received value to defalut value', () =>
      expect(instance.icwaToString('Foo')).toEqual([]));

    it('should set received value to  Pending', () =>
      expect(instance.icwaToString('X')).toEqual('Pending'));
  });

  it('toggles the addOtherEthnicity flag', () => {
    const wrapper = clientPage.instance();
    wrapper.onClick();
    expect(wrapper.state.addOtherEthnicity).toEqual(true);
    wrapper.onClick();
    expect(wrapper.state.addOtherEthnicity).toEqual(false);
  });

  describe('when AddOtherEthnicity is clicked', () => {
    it('adds a DropDownField', () => {
      clientPage.setState({
        addOtherEthnicity: true,
      });
      expect(clientPage.find('[label="Other Ethnicity"]').exists()).toEqual(
        true
      );
    });
  });

  describe('#raceAndEthnicity', () => {
    it('Displays msg if records are empty', () => {
      const wrapper = shallow(
        <RaceAndEthnicity childClient={{ other_ethnicity: '' }} />
      );
      const instance = wrapper.instance();
      expect(instance.raceAndEthnicity()).toEqual(
        'No Ethnicities exist at the moment'
      );
    });

    it('displays BootstrapTable if has some records', () => {
      const wrapper = shallow(
        <RaceAndEthnicity
          childClient={{ foo: 'bar', other_ethnicity: ['Filipino'] }}
        />
      );
      expect(wrapper.find('BootstrapTable').length).toEqual(1);
    });

    it('returns empty string when Unable to determine is selected', () => {
      const wrapper = shallow(<RaceAndEthnicity childClient={''} />);
      const instance = wrapper.instance();
      instance.setState({
        childClient: {
          primary_race: 'Unable to Determine*',
        },
      });
      expect(instance.raceAndEthnicity()).toEqual('');
    });

    it('returns empty string when Decline to State', () => {
      const wrapper = shallow(<RaceAndEthnicity childClient={''} />);
      const instance = wrapper.instance();
      instance.setState({
        childClient: {
          primary_race: 'Declines to state*',
        },
      });
      expect(instance.raceAndEthnicity()).toEqual('');
    });
  });
});
