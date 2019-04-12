import React, { PureComponent } from 'react'
import { connect } from './react-redux';

class Body extends PureComponent {
  render() {
    return (
      <div>
        <button onClick={() => this.props.handleChangeColor('red')}>red</button>
        <button onClick={() => this.props.handleChangeColor('blue')}>blue</button>
      </div>
    )
  }
}

export default connect(undefined, {
  handleChangeColor: (disptach) => {
    return (data) => {
      disptach({ type: 'UPDATE_COLOR', payload: data })
    };
  }
})(Body);
