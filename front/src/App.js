import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './component/Layout';
import List from './component/List';
import Post from './component/Post';
import Write from './component/Write';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/post" component={Post} />
          <Route path="/Write" component={Write} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
