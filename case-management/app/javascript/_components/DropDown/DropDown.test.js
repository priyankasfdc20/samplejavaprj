import React from 'react';
import DropDown from './DropDown.js';
import { shallow } from 'enzyme';

describe('DropDown', function() {
  let onChangeSpy;

  beforeEach((onChangeSpy = jasmine.createSpy('onChange')));
  let props = {
    options: ['Male', 'Female'],
    selectedOption: 'Male',
    placeholder: 'Values',
    gridClassName: 'Grid class name',
    label: 'label name',
    selectClassName: 'classnames',
    onChange: onChangeSpy,
  };
  const wrapper = shallow(<DropDown {...props} />);
  const instance = wrapper.instance();

  it('has basic elements ', () => {
    expect(wrapper.hasClass('form-group')).toEqual(true);
  });

  it('has props', () => {
    expect(instance.props.options).toEqual(['Male', 'Female']);
    expect(instance.props.gridClassName).toEqual('Grid class name');
    expect(instance.props.selectedOption).toEqual('Male');
    expect(instance.props.placeholder).toEqual('Values');
    expect(instance.props.gridClassName).toEqual('Grid class name');
    expect(instance.props.label).toEqual('label name');
    expect(instance.props.selectClassName).toEqual('classnames');
    expect(instance.props.onChange).toEqual(onChangeSpy);
  });

  it('returns the Input and Label tags', () => {
    expect(wrapper.find('Select').length).toBe(1);
    expect(wrapper.find('label').length).toBe(1);
  });
});
