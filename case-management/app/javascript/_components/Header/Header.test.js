import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';

jest.mock('../../_services/account');
const AccountService = require('../../_services/account').default;

describe('Header', () => {
  describe('when logged in', () => {
    it('shows user name', async () => {
      AccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          first_name: 'John',
          last_name: 'Doe',
        })
      );
      const wrapper = await mount(<Header />);
      const displayedUserName = wrapper
        .find('.profile')
        .text()
        .trim();
      expect(displayedUserName).toBe('John Doe');
    });

    it('shows user initials', async () => {
      AccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          first_name: 'John',
          last_name: 'Doe',
        })
      );
      const wrapper = await mount(<Header />);
      const displayedUserInitials = wrapper
        .find('.profile-avatar')
        .text()
        .trim();
      expect(displayedUserInitials).toBe('JD');
    });

    it('invokes callback', async () => {
      const mockCallback = jest.fn();
      AccountService.fetchCurrent.mockReturnValue(
        Promise.resolve({
          staff_id: 'id',
        })
      );
      await mount(<Header onUserFetchedCallback={mockCallback} />);
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe('id');
    });

    it('shows logout dropdown and invokes logoutCallback', async () => {
      const HeaderMock = require.requireActual('./Header.jsx').default;
      HeaderMock.prototype.logout = jest.fn();
      AccountService.fetchCurrent.mockReturnValue(Promise.resolve({}));
      const wrapper = await mount(<Header />);

      // click avatar
      wrapper
        .find('.profile-avatar a')
        .first()
        .simulate('click', { button: 0 });

      // click dropped Logout link, it also validates the menu is dropped down
      wrapper
        .update()
        .find('.profile-avatar ul.c_dropdown a')
        .first()
        .simulate('click', { button: 0 });

      expect(HeaderMock.prototype.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('when failed to fetch user', () => {
    it('shows empty user name', async () => {
      AccountService.fetchCurrent.mockReturnValue(
        Promise.reject(new Error('e'))
      );
      const wrapper = await mount(<Header />);
      const displayedUserName = wrapper
        .find('.profile')
        .text()
        .trim();
      expect(displayedUserName).toBe('');
    });

    it('does not invoke callback', async () => {
      AccountService.fetchCurrent.mockReturnValue(
        Promise.reject(new Error('e'))
      );
      const mockCallback = jest.fn();
      await mount(<Header onUserFetchedCallback={mockCallback} />);
      expect(mockCallback.mock.calls.length).toBe(0);
    });
  });
});
