## Redux模式

### Store和dispatch

Redux本质是一个共享状态对象, 但是没有任何限制，任何人在任何时候都可以去修改数据，导致最后使用的时候获取的数据是不可预期的，
那么Redux提出的方案是`把事情搞复杂一些，提高数据修改的门槛：模块（组件）之间可以共享数据，也可以改数据。但是我们约定，这个数据并不能直接改，你只能执行某些我允许的某些修改，而且你修改的必须大张旗鼓地告诉我。`
这个函数就是`dispatch`, 专门用来负责数据的修改， 其中必须的参数是`type`字段，用来识别用户具体做了什么操作

```js
function reducer(action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}

function createStore (state, reducer) {
  const getState = () => state
  const dispatch = (action) => reducer(state, action)
  return { getState, dispatch }
}
```

### reducer需要为一个纯函数

纯函数的概念来自于函数式编程
1. 一个函数的返回结果只依赖于它的参数
2. 执行过程里面没有副作用

好处
1. 输出的结果可以预期，使reducer函数更好调试和测试。

上面的reducer是直接对appState进行了修改，那么会导致无法区分哪些字段进行了修改，哪些字段没有被修改，所以reducer需要每次执行以后返回一个新的appState，其中未修改的部分可以直接使用老数据的引用，可以防止无用的渲染，另外一个好处是一个记录新旧数据的区别，来实现时间旅行功能，


### 订阅
假如我们的更新代码是
```js
renderTitle(store.getState())
```
那么当我们每次dispatch以后都需要去手动的执行上面的函数来进行页面上的同步

这里我们可以使用观察者模式来进行自动同步页面，修改createStore函数为
```js
function createStore (state, reducer) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
```
发现暴露出一个subscribe方法，然后我们的使用方法就变成
```js
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(state, reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderTitle(store.getState()))

// 首次渲染页面
renderTitle(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```


### 自制react-redux
