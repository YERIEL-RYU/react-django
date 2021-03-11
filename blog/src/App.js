import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Post from './component/Post'

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Post} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;