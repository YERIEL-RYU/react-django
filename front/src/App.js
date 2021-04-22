import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./component/Layout";
import List from "./component/List";
import Post from "./component/Post";
import Write from "./component/Write";
import Test from "./component/Test/Test";
import Quill from "./component/Test/Quill_drop_paste";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/post" component={Post} />
          <Route path="/write" component={Write} />
          <Route path="/test" component={Test} />
          <Route path="/quill" component={Quill} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
