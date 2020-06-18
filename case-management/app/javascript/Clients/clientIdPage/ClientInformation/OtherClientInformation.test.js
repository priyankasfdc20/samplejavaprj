import React from 'react';
import { shallow } from 'enzyme';
import OtherClientInformation from './OtherClientInformation.js';

describe('Other Client Information', () => {
  let otherClient;

  beforeEach(() => {
    otherClient = shallow(<OtherClientInformation childClient={{}} />);
  });

  it('renders  DropDownFields and InputComponents', () => {
    expect(otherClient.find('DropDownField').length).toEqual(4);
    expect(otherClient.find('InputComponent').length).toEqual(2);
  });

  describe('#handleOnChange() function', () => {
    it('should set the childClient state when event is triggered', () => {
      const expectedvalue = { myKey: 'foo' };
      const instance = otherClient.instance();
      const myFunction = instance.handleOnChange('myKey');
      expect(() => myFunction({ value: 'foo' })).not.toThrow();
      expect(instance.state.childClient).toEqual(expectedvalue);
    });
  });

  describe('#componentWillReceiveProps()', () => {
    it('should change the state', () => {
      const value = { marital_status_type: 'Hello' };
      const wrapper = shallow(<OtherClientInformation childClient={value} />);
      wrapper.setProps({ childClient: value });
      expect(wrapper.state('childClient')).toEqual(value);
    });
  });
});
