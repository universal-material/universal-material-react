import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export Button from './components/Button';

export default class ExampleComponent extends Component {
  static propTypes = {
    text: PropTypes.string
  }

  render() {
    const {
      text
    } = this.props

    return (
      <div testattr className={styles.test}>
        Example Components: {text}
      </div>
    )
  }
}
