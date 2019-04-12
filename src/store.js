function createStore(state, reducer) {
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const unsubscribe = (fn) => {
    const index = listeners.indexOf(fn);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }
  return { getState, dispatch, subscribe, unsubscribe };
}

const appState = {
  text: '炉石传说',
  color: 'red',
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_COLOR':
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
} 

export default createStore(appState, reducer);
