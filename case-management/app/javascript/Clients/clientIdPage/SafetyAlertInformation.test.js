import React from 'react';
import { shallow } from 'enzyme';
import SafetyAlertInformation from './SafetyAlertInformation.js';

describe('Safety Alert Information', () => {
  let safetyAlert;

  beforeEach(() => {
    safetyAlert = shallow(<SafetyAlertInformation safetyAlerts={{}} />);
  });

  it('renders a Cards, DropDownFields and CheckboxRadioGroup', () => {
    expect(safetyAlert.find('Cards').length).toBeGreaterThan(0);
  });

  it('should render the Button component', () => {
    expect(safetyAlert.find('Button').length).toEqual(1);
  });

  it('#onClick() toggles the addAlert flag', () => {
    const wrapper = safetyAlert.instance();
    wrapper.onClick();
    expect(wrapper.state.addAlert).toEqual(true);
    wrapper.onClick();
    expect(wrapper.state.addAlert).toEqual(false);
  });

  it('Verify the components after onclick', () => {
    safetyAlert.setState({ addAlert: true });
    expect(safetyAlert.find('DropDownField').length).toEqual(3);
    expect(safetyAlert.find('TextArea').length).toEqual(2);
    expect(safetyAlert.find('DateTimePicker').length).toEqual(2);
  });

  it('#alertInfo function defined', () => {
    const instance = safetyAlert.instance();
    expect(instance.alertInfo()).toBeDefined();
  });

  describe('#alertInfo output', () => {
    it('displays message', () => {
      const props = {
        safetyAlerts: '',
      };
      safetyAlert = shallow(<SafetyAlertInformation {...props} />);
      const instance = safetyAlert.instance();
      expect(instance.alertInfo()).toBe(
        'Currently No SafetyAlerts. Click AddAlert button to add New Alerts'
      );
      expect(safetyAlert.find('BootstrapTable').length).toBe(0);
    });

    it('displays table', () => {
      const props = {
        safetyAlerts: [{}, {}],
      };
      safetyAlert = shallow(<SafetyAlertInformation {...props} />);
      expect(safetyAlert.find('BootstrapTable').length).toBe(1);
      expect(safetyAlert.find('TableHeaderColumn').length).toBe(4);
    });
  });
});
