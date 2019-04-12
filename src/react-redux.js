import React from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext();

function returnValue(value) {
  return value;
} 

export function connect(stateFn = returnValue, actions = {}) {
  return (Component) => {
    class A extends React.PureComponent {
      componentDidMount() {
        this.subscribe(() => {
          this.forceUpdate();
        });
      }
      // componentWillUnmount() {
      //   this.unsubscribe(this, this.handleRender);
      // }
      render() {
        return <Context.Consumer>
          {({ getState, dispatch, subscribe, unsubscribe }) => {
            this.subscribe = subscribe;
            this.unsubscribe = unsubscribe;
            const state = stateFn(getState());
            const resultActions = Object.keys(actions).reduce((result, key) => ({
              ...result,
              [key]: actions[key](dispatch),
            }), {});
            return <Component {...state} {...resultActions} />
          }}
        </Context.Consumer>
      }
    }
    A.contextType = Context;
    return A;
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
