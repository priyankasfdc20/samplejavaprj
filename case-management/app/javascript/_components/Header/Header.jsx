import React from 'react';
import PropTypes from 'prop-types';
import { GlobalHeader } from 'react-wood-duck';
import { trimSafely } from '../../_utils/formatters';
import AccountService from '../../_services/account';

const logoutUrl = process.env.CASE_APP_JS_API_URL + 'logout';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userInitials: '..',
      user: {},
      XHRStatus: 'idle',
    };
  }

  static propTypes = {
    /** callback to be invoked when user info is successfully fetched, should accept staffId as a parameter */
    onUserFetchedCallback: PropTypes.func,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    this.setState({ XHRStatus: 'waiting' });
    return AccountService.fetchCurrent()
      .then(this.onFetchSuccess)
      .catch(() => this.setState({ XHRStatus: 'error' }));
  };

  onFetchSuccess = staffPerson => {
    this.setState({
      XHRStatus: 'ready',
      user: {
        user: staffPerson,
      },
    });
    this.updateName(staffPerson);
    this.updateInitials(staffPerson);
    this.invokeCallback(staffPerson.staff_id);
  };

  updateName = staffPerson => {
    const firstName = trimSafely(staffPerson.first_name);
    const lastName = trimSafely(staffPerson.last_name);
    const userName = `${firstName} ${lastName}`;
    this.setState({ userName });
  };

  updateInitials = staffPerson => {
    const firstName = trimSafely(staffPerson.first_name);
    const firstLetter = firstName.length > 0 ? firstName[0] : '';
    const lastName = trimSafely(staffPerson.last_name);
    const secondLetter = lastName.length > 0 ? lastName[0] : '';
    const userInitials = '' + firstLetter + secondLetter;
    if (userInitials) {
      this.setState({ userInitials });
    }
  };

  invokeCallback = staffId => {
    const { onUserFetchedCallback } = this.props;
    if (onUserFetchedCallback) {
      onUserFetchedCallback(staffId);
    }
  };

  logout() {
    window.location.href = logoutUrl;
  }

  render = () => {
    const { userName, userInitials } = this.state;
    return (
      <GlobalHeader
        profileName={userName}
        logoutCallback={this.logout}
        profileAvatar={userInitials}
      />
    );
  };
}

export default Header;
