import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import List from './component/List'
import Post from './component/Post'

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/post" component={Post} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;