import React from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext();

function returnValue(value) {
  return value;
} 

export function connect(stateFn = returnValue, actions = {}) {
  return (Component) => {
    class ConnectHOC extends React.PureComponent {
      static contextType = Context;

      state = {}

      componentDidMount() {
        const { dispatch, subscribe } = this.context;
        subscribe(this.handleUpdate);
        const resultActions = Object.keys(actions).reduce((result, key) => ({
          ...result,
          [key]: actions[key](dispatch),
        }), {});
        this.setState(() => ({
          ...resultActions,
        }));
        this.handleUpdate();
      }

      handleUpdate = () => {
        const { getState } = this.context;
        const state = stateFn(getState());
        this.setState(() => ({
          ...state,
        }));
      }

      componentWillUnmount() {
        const { unsubscribe } = this.context;
        unsubscribe(this.handleUpdate);
      }

      render() {
        console.log(this.state, this.context);
        return <Component {...this.state} />;
      }
    }
    return ConnectHOC;
  }
}

export class Provider extends React.PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  render() {
    return <Context.Provider value={this.props.store}>
      {this.props.children}
    </Context.Provider>
  }
}
