import React, { useState, Fragment } from 'react';
import Header from './Header';
import Body from './Body';

function App() {
  const [isShow, setState] = useState(true);
  return (
    <div>
      {isShow ? <Fragment>
        <Header></Header>
        <Body></Body>
      </Fragment> : '空'}
      <button onClick={() => setState(!isShow)}>click</button>
    </div>
  );
}

export default App;
