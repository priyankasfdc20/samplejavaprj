import React from 'react';
import { shallow } from 'enzyme';
import CsecInformation from './CsecInformation.js';

describe('Csec Information', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CsecInformation />);
  });

  it('renders Button', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  describe('#displayOnClick()', () => {
    it('toggles the addCsec flag', () => {
      const instance = wrapper.instance();
      instance.displayOnClick();
      expect(instance.state.addCsec).toEqual(true);
      instance.displayOnClick();
      expect(instance.state.addCsec).toEqual(false);
    });
  });

  describe('#csecData()', () => {
    describe('#without data', () => {
      it('displays message', () => {
        wrapper = shallow(<CsecInformation csecResponse={[]} />);
        const instance = wrapper.instance();
        expect(instance.csecData()).toEqual(
          'Currently No CSEC Information. Click Add Csec to add Csec Data'
        );
      });
    });

    describe('#with data', () => {
      it('displays BootstrapTable', () => {
        wrapper = shallow(
          <CsecInformation csecResponse={[{ child_client_id: 'ABC' }]} />
        );
        expect(wrapper.find('BootstrapTable').length).toEqual(1);
      });
    });
  });

  describe('#handleChange()  function', () => {
    it('should an event handler that sets state', () => {
      const instance = wrapper.instance();
      const expectedvalue = { myKey: 'foo' };
      const myFunction = instance.handleChange('myKey');
      expect(() => myFunction({ value: 'foo' })).not.toThrow();
      expect(instance.state.newCsec).toEqual(expectedvalue);
    });
  });

  describe('#componentWillReceiveProps()', () => {
    it('should change the state', () => {
      const value = { sexual_exploitation_type: 'Asexual', start_date: '' };
      const wrapper = shallow(
        <CsecInformation csecResponse={{ foo: 'bar' }} />
      );
      wrapper.setProps({ csecResponse: value });
      expect(wrapper.state('csec')).toEqual(value);
    });
  });
});
