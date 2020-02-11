import React from 'react'
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Ripple from './Ripple';


const Button = React.forwardRef(({style, color, ...props}) => {
  const classes = classNames(
    `u-btn-${color}`,
    `u-btn-${style}`
  );

  return <Ripple as="button" {...props} className={classes} />
});

Button.propTypes = {
  color: PropTypes.string,
  style: PropTypes.string
};

Button.defaultProps = {
  color: 'default',
  style: 'solid'
};

export default Button;
