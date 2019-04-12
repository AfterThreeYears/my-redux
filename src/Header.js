import React, { PureComponent } from 'react'
import { connect } from './react-redux';

class Header extends PureComponent {
  render() {
    return (
      <div style={{ color: this.props.color }}>
        {this.props.text}
      </div>
    )
  }
}

export default connect(
  ({ color, text }) => ({ color, text })
)(Header);
