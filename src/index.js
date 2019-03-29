function renderTitle(newTitle, oldTitle) {
  if (newTitle === oldTitle) return;
  console.log('renderTitle');
  const t = document.querySelector('#title');
  t.innerHTML = newTitle.text;
  t.style.color = newTitle.color;
}

function renderContent(newContent, oldContent) {
  if (newContent === oldContent) return;
  console.log('renderContent');
  const c = document.querySelector('#content');
  c.innerHTML = newContent.text;
  c.style.color = newContent.color;
}


function render(newState, oladState) {
  if (newState === oladState) return;
  debugger;
  console.log('render');
  renderTitle(newState.title, oladState.title);
  renderContent(newState.content, oladState.content);
}

const appState = {
  title: {
    text: '炉石传说',
    color: 'red',
  },
  content: {
    text: '祖尔金',
    color: 'blue',
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.payload
        },
      };
    case 'UPDATE_CONTENT':
      return {
        ...state,
        content: {
          ...state.content,
          text: action.payload
        },
      };
    default:
      return state;
  }
} 

function createStore(state, reducer) {
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }
  return { getState, dispatch, subscribe };
}

const { dispatch, subscribe, getState } = createStore(appState, reducer);
window.dispatch = dispatch;

let oldState = getState();
subscribe(() => {
  const newState = getState();
  console.log(newState, oldState);
  render(newState, oldState);
  oldState = newState;
});

render(getState(), {});
dispatch({ type: 'UPDATE_TITLE', payload: '圣盾' });


