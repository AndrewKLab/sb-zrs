import React from 'react';
import { connect } from 'react-redux';

export class Switch extends React.Component {
  render() {
    const { switched, handleToggle, onColor } = this.props;
    return (
      <div className='switch'>
        <input
          checked={switched}
          onChange={handleToggle}
          className={`switch-checkbox`}
          id={`switch`}
          type="checkbox"
        />
        <label
          style={{ background: switched && onColor }}
          className={`switch-label`}
          htmlFor={`switch`}
        >
          <span className={`switch-button`} />
        </label>
      </div>
    );
  }
};



