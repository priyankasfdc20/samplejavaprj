import React from 'react';
import { shallow, mount } from 'enzyme';
import DropDownMenu from './DropDownMenu';

describe('DropDownMenu', () => {
  let dropDown;
  beforeEach(() => {
    dropDown = shallow(<DropDownMenu />);
  });

  it('renders DropDownMenu Component', () => {
    expect(dropDown.children().length).toBe(1);
  });

  it('verfies the lengths of button, .dropbtn & .dropdown-content', () => {
    dropDown.find('button').simulate('click', { preventDefault() {} });
    expect(dropDown.find('button').length).toEqual(1);
    expect(dropDown.find('.dropbtn').length).toEqual(1);
    expect(dropDown.find('.dropdown-content').length).toEqual(2);
  });

  it('checks if openMenu function is defined', () => {
    const instance = dropDown.instance();
    expect(instance.openMenu).toBeDefined();
  });

  it('checks if closeMenu function is defined', () => {
    const instance = dropDown.instance();
    expect(instance.closeMenu).toBeDefined();
  });

  it('toggles the openMenu event', () => {
    const instance = dropDown.instance();
    instance.setState({ openMenu: false });
    expect(instance.state.openMenu).toBe(false);
    instance.setState({ openMenu: true });
    expect(instance.state.openMenu).toBe(true);
  });

  it('toggles the closeMenu event', () => {
    const instance = dropDown.instance();
    instance.setState({ closeMenu: false });
    expect(instance.state.closeMenu).toBe(false);
    instance.setState({ closeMenu: true });
    expect(instance.state.closeMenu).toBe(true);
  });

  it('toggles the dropdownMenu event', () => {
    const instance = dropDown.instance();
    instance.setState({ dropdownMenu: false });
    expect(instance.state.dropdownMenu).toBe(false);
    instance.setState({ dropdownMenu: true });
    expect(instance.state.dropdownMenu).toBe(true);
  });

  it('is dropped on open button clicked ', async () => {
    // given
    const wrapper = await mount(<DropDownMenu />);
    expect(wrapper.state().showMenu).toBe(false);

    // when
    const button = wrapper.find('button.dropbtn').first();
    await button.simulate('click');

    // then
    expect(wrapper.state().showMenu).toBe(true);
  });

  it('is closed on document click when dropdown is open', () => {
    // given
    const eventsMockMap = {};
    document.addEventListener = (event, cb) => {
      eventsMockMap[event] = cb;
    };
    document.removeEventListener = event => {
      delete eventsMockMap[event];
    };
    const wrapper = mount(<DropDownMenu />);
    expect(wrapper.state().showMenu).toBe(false);

    // when
    wrapper
      .find('button.dropbtn')
      .first()
      .simulate('click');
    expect(wrapper.state().showMenu).toBe(true);
    eventsMockMap['click']({});

    // then
    expect(wrapper.state().showMenu).toBe(false);
    expect(eventsMockMap).toEqual({});
  });
});
