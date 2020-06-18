import React from 'react';
import { shallow } from 'enzyme';
import ClientIdSidebar from './ClientIdSideBar.js';

describe('Client Information', () => {
  let Sidebar;
  beforeEach(() => {
    Sidebar = shallow(<ClientIdSidebar />);
  });

  it('renders NavLinks', () => {
    expect(Sidebar.find('NavLinks').length).toEqual(1);
  });

  it('renders NavLink', () => {
    expect(Sidebar.find('NavLink').length).toEqual(3);
  });

  it('has a <SideBar />', () => {
    expect(Sidebar.find('SideBar').exists()).toBe(true);
  });
});
