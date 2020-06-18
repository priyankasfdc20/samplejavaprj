import React from 'react';
import { shallow } from 'enzyme';
import ClientInformation from './ClientInformation.js';
import moment from 'moment';

describe('<ClientInformation />', () => {
  let clientPage;

  beforeEach(
    () => (clientPage = shallow(<ClientInformation childClient={{}} />))
  );

  it('renders components', () => {
    expect(clientPage.find('InputComponent').length).toBe(7);
    expect(clientPage.find('DropDownField').length).toBe(6);
    expect(clientPage.find('DropDown').length).toBe(1);
  });

  describe('#handleConfidentiality()  function', () => {
    it('should set the childClient state', () => {
      const instance = clientPage.instance();
      instance.handleConfidentiality({ target: { checked: true } });
      expect(instance.state.childClient.confidentiality_in_effect_ind).toBe(
        true
      );
    });
  });

  describe('When confidentiality_in_effect_ind is checked ', () => {
    it('adds a component(Effective Date)', () => {
      clientPage.setState({
        childClient: { confidentiality_in_effect_ind: true },
      });
      expect(clientPage.find('[label="Effective Date"]').exists()).toBe(true);
    });
  });

  describe('#handleMinorNMD()  function', () => {
    it('should set the childClient state', () => {
      const instance = clientPage.instance();
      instance.handleMinorNMD({ target: { checked: true } });
      expect(instance.state.childClient.minor_nmd_parent_indicator).toBe(true);
    });
  });

  describe('#checkDOB()  function', () => {
    it('should set the state', () => {
      const instance = clientPage.instance();
      instance.setState({
        childClient: { estimated_dob_code: 'N', birth_dt: '2012-09-23' },
      });
      instance.checkDOB();
      expect(instance.state.dateOfBirth).toEqual('2012-09-23');
      instance.setState({
        childClient: { estimated_dob_code: 'Y', birth_dt: '2012-09-23' },
      });
      instance.checkDOB();
      expect(instance.state.dateOfBirth).toBe('');
    });
  });

  describe('#handleSafelySurrendered()  function', () => {
    it('should set the childClient state', () => {
      const instance = clientPage.instance();
      instance.handleSafelySurrendered({ target: { checked: true } });
      expect(
        instance.state.childClient.safely_surrended_babies_indicator_var
      ).toBe(true);
    });
  });

  describe('#handleOutstandingWarrant()  function', () => {
    it('should set the childClient state', () => {
      const instance = clientPage.instance();
      instance.handleOutstandingWarrant({ target: { checked: true } });
      expect(instance.state.childClient.outstanding_warrant_indicator).toBe(
        true
      );
    });
  });

  describe('#handleDobChange()', () => {
    it('should calculate the Age based on user input date of birth ', () => {
      const instance = clientPage.instance();
      let userValue = moment('2002 08 02', 'YYYY MM DD');
      instance.handleDobChange({
        target: { value: moment('2002 08 02', 'YYYY MM DD') },
      });
      expect(instance.state.dateOfBirth).toEqual(userValue);
      expect(instance.state.age).toBeGreaterThan(15);
      expect(instance.state.ageUnitValue).toEqual('years');
      expect(instance.state.childClient.estimated_dob_code).toEqual('N');
    });

    it('should set the estimated_dob_code as Y if date of birth is given blank ', () => {
      const instance = clientPage.instance();
      instance.handleDobChange({ target: { value: '' } });
      expect(instance.state.childClient.estimated_dob_code).toEqual('Y');
    });
  });

  describe('#handleInputChange()  function', () => {
    it('should handle that sets state', () => {
      const expectedvalue = { myKey: 'foo' };
      const instance = clientPage.instance();
      const myFunction = instance.handleInputChange('myKey', 'foo');
      expect(() => myFunction({ target: { value: 'foo' } })).not.toThrow();
      expect(instance.state.childClient).toEqual(expectedvalue);
    });
  });

  describe('#handleDropDownChange()  function', () => {
    it('should handle an event that sets state', () => {
      const expectedvalue = { myKey: 'foo' };
      const instance = clientPage.instance();
      const myFunction = instance.handleDropDownChange('myKey');
      expect(() => myFunction({ value: 'foo' })).not.toThrow();
      expect(instance.state.childClient).toEqual(expectedvalue);
    });
  });

  describe('#validateField()', () => {
    describe('Validate the firstName', () => {
      it('displays error message when given special characters', () => {
        const instance = clientPage.instance();
        instance.validateField('common_first_name', 'foo&&&');
        expect(instance.state.errorMessage.firstNameError).toEqual(
          'Enter at least one alpha character / No special characters'
        );
      });

      it('displays error message when given only numeric character', () => {
        const instance = clientPage.instance();
        instance.validateField('common_last_name', '1234');
        expect(instance.state.errorMessage.lastNameError).toEqual(
          'Enter at least one alpha character / No special characters'
        );
      });

      it('displays empty', () => {
        const instance = clientPage.instance();
        instance.validateField('common_first_name', 'foo');
        expect(instance.state.errorMessage.firstNameError).toEqual('');
      });
    });

    describe('Validate the middleName', () => {
      it('displays error message when given special character', () => {
        const instance = clientPage.instance();
        instance.validateField('common_middle_name', 'foo&&&');
        expect(instance.state.errorMessage.middleNameError).toEqual(
          'Enter at least one alpha character / No special characters'
        );
      });

      it('displays empty if no error message', () => {
        const instance = clientPage.instance();
        instance.validateField('common_middle_name', 'foo');
        expect(instance.state.errorMessage.middleNameError).toEqual('');
      });
    });

    describe('Validate the lastName', () => {
      it('displays error message when given special characters', () => {
        const instance = clientPage.instance();
        instance.validateField('common_last_name', 'foo&&&');
        expect(instance.state.errorMessage.lastNameError).toEqual(
          'Enter at least one alpha character / No special characters'
        );
      });

      it('displays error message when given only numeric characters', () => {
        const instance = clientPage.instance();
        instance.validateField('common_last_name', 'foo&&&');
        expect(instance.state.errorMessage.lastNameError).toEqual(
          'Enter at least one alpha character / No special characters'
        );
      });

      it('displays empty', () => {
        const instance = clientPage.instance();
        instance.validateField('common_last_name', 'foo');
        expect(instance.state.errorMessage.lastNameError).toEqual('');
      });
    });

    describe('Validate the CIN field', () => {
      it('displays error message', () => {
        const instance = clientPage.instance();
        instance.validateField('sci_index_number', '12f&&&');
        expect(instance.state.errorMessage.sciIndexNumberError).toEqual(
          'Not more than 10 Characters / No Special Characters'
        );
      });

      it('displays empty', () => {
        const instance = clientPage.instance();
        instance.validateField('sci_index_number', '12dhg');
        expect(instance.state.errorMessage.sciIndexNumberError).toEqual('');
      });

      it('should allow maximum 10 characters', () => {
        expect(
          clientPage
            .find('[label="Client Index Number (CIN)"]')
            .prop('maxLength')
        ).toEqual(10);
      });
    });
  });

  describe('#componentWillReceiveProps()', () => {
    it('should change the state', () => {
      const value = { id: '42' };
      const wrapper = shallow(
        <ClientInformation childClient={{ foo: 'bar' }} />
      );
      wrapper.setProps({ childClient: value });
      expect(wrapper.state('childClient')).toEqual({ id: '42' });
    });
  });

  describe('#displayAge()  function', () => {
    it('should event handler sets state', () => {
      const wrapper = shallow(
        <ClientInformation
          childClient={{ birth_dt: moment('2002 08 02', 'YYYY MM DD') }}
        />
      );
      const instance = wrapper.instance();
      instance.displayAge();
      expect(instance.state.age).toBeGreaterThan(15);
      expect(instance.state.ageUnitValue).toEqual('years');
    });
  });

  describe('#handleAge() ', () => {
    it('should set the state age', () => {
      const instance = clientPage.instance();
      instance.handleAge({ target: { value: 24 } });
      expect(instance.state.age).toBe(24);
      expect(instance.state.childClient.estimated_dob_code).toBe('Y');
    });
  });

  describe('#handleAgeUnits() function', () => {
    it('should not set state of age to 1 if age is entered and dob is empty', () => {
      const instance = clientPage.instance();
      instance.setState({ age: 4 });
      const myFunction = instance.handleAgeUnits('ageUnitValue');
      expect(() => myFunction({ value: 'years' })).not.toThrow();
      expect(instance.state.age).toEqual(4);
      expect(instance.state.ageUnitValue).toEqual('years');
      expect(instance.state.childClient.estimated_dob_code).toEqual('Y');
    });

    it('should set the age to 1 if ageUnit is selected when age and dob is empty', () => {
      const instance = clientPage.instance();
      instance.setState({ age: '' });
      const test = instance.handleAgeUnits('ageUnitValue');
      expect(() => test({ value: 'years' })).not.toThrow();
      expect(instance.state.age).toEqual(1);
      expect(instance.state.ageUnitValue).toEqual('years');
      expect(instance.state.childClient.estimated_dob_code).toEqual('Y');
    });
  });

  describe('#getEstimatedDob() ', () => {
    it('returns estimated date of birth', () => {
      const wrapper = shallow(<ClientInformation />);
      const instance = wrapper.instance();
      var estimatedDateOfBirth = moment()
        .subtract(32, 'year')
        .format('MM/DD/YYYY');
      instance.setState({ age: 32, ageUnitValue: 'years' });
      expect(instance.getEstimatedDob()).toBe(estimatedDateOfBirth);
    });
  });
});
