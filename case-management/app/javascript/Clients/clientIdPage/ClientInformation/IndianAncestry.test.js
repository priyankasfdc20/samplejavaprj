import React from 'react';
import { shallow } from 'enzyme';
import IndianAncestry from './IndianAncestry.js';

describe('IndianAncestry', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<IndianAncestry />);
  });

  it('renders Button', () => {
    expect(wrapper.find('Button').length).toEqual(1);
  });

  describe('#handleOnClick()', () => {
    it('toggles the addNotifications flag', () => {
      const instance = wrapper.instance();
      instance.handleOnClick();
      expect(instance.state.addNotifications).toEqual(true);
      instance.handleOnClick();
      expect(instance.state.addNotifications).toEqual(false);
    });
  });

  describe('#notification()', () => {
    it('displays message', () => {
      wrapper = shallow(<IndianAncestry indianAncestry={[]} />);
      const instance = wrapper.instance();
      expect(instance.notificationInfo()).toEqual(
        'Currently No IndianAncestry Notifications.Click Add Notification to add'
      );
    });

    it('displays BootstrapTable', () => {
      wrapper = shallow(
        <IndianAncestry indianAncestry={[{ child_client_id: 'ABC' }]} />
      );
      expect(wrapper.find('BootstrapTable').length).toEqual(1);
    });
  });

  describe('#handleDropDownChange()  function', () => {
    it('should an event handler that sets state', () => {
      const expectedvalue = { myKey: 'foo' };
      const instance = wrapper.instance();
      const myFunction = instance.handleDropdownChange('myKey');
      expect(() => myFunction({ value: 'foo' })).not.toThrow();
      expect(instance.state.newAncestry).toEqual(expectedvalue);
    });
  });

  describe('#componentWillReceiveProps()', () => {
    it('should change the state', () => {
      const value = { notification_date: '23' };
      const wrapper = shallow(
        <IndianAncestry indianAncestry={{ foo: 'bar' }} />
      );
      wrapper.setProps({ indianAncestry: value });
      expect(wrapper.state('indianAncestry')).toEqual(value);
    });
  });
});
