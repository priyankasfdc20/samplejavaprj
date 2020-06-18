import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropDownMenu extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
  }

  openMenu = event => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = event => {
    !this.dropdownMenu.contains(event.target) &&
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.openMenu} className="dropbtn">
          <span className="glyphicon glyphicon-option-vertical" />
        </button>

        {this.state.showMenu && (
          <div
            className="dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <div className="dropdown">
              <i className="up dropdown" />
              <div className="dropdown-content">
                {this.props.menuItem1}
                {this.props.menuItem2}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  menuItem1: PropTypes.object,
  menuItem2: PropTypes.object,
};
export default DropDownMenu;
