const appState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        count: state.count + 1,
      };
    case 'ADD_SOME':
      return {
        count: state.count + action.payload,
      };
    case 'SUB':
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
} 

const { dispatch, subscribe, getState } = Redux.createStore(reducer, appState);

let oldState = null;
subscribe(() => {
  const newState = getState();
  console.log(newState, oldState);
  render(newState, oldState);
  oldState = newState;
});

function render(newState, oladState) {
  if (newState === oladState) return;
  document.querySelector('.result').textContent = newState.count;
}

render(getState());

