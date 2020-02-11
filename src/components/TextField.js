import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

class TextField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      inputValue: props.value
    }
  }

  _onBlur = () => {
    this.setState({focused: false});
  }

  _onFocus = () => {
    this.setState({focused: true});
  }

  _setValue = (e) => {
    this.setState({inputValue: e.target.value});
  }

  render() {
    const classes = classNames(
      'u-text-field',
      this.props.appearance && `u-text-field-${this.props.appearance}`,
      {
        'empty': !this.state.inputValue,
        'focus': this.state.focused,
        'invalid': this.props.invalid
      });

    return <div className={classes}>
      <input type={this.props.type} value={this.state.inputValue} onChange={this._setValue} className={"u-text-input"} onBlur={this._onBlur} onFocus={this._onFocus} />
      <label>{this.props.label}</label>
    </div>
  }
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  appearance: PropTypes.string,
  value: PropTypes.any
}

TextField.defaultProps  = {
  appearance: 'box',
  type: 'text'
}

export default TextField;
