import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class DropDown extends React.Component {
  render() {
    const {
      gridClassName,
      label,
      id,
      options,
      selectedOption,
      disabled,
      onChange,
      selectClassName,
    } = this.props;
    return (
      <div className="form-group">
        <div className={gridClassName}>
          <label htmlFor={label}>{label}</label>
          <Select
            value={selectedOption}
            id={id}
            onChange={onChange}
            placeholder=""
            className={selectClassName}
            options={options}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

DropDown.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
  selectedOption: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  gridClassName: PropTypes.string,
  label: PropTypes.string,
  selectClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

DropDown.defaultpropTypes = {
  label: 'Select DropDown',
  selectClassName: 'reusable-select',
};

export default DropDown;
