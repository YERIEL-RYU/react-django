import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./component/Layout";
import List from "./component/List";
import Post from "./component/Post";
import Write from "./component/Write";
import Test from "./component/Test/Test";
import Quill from "./component/Test/Quill_drop_paste";
import Login from "./component/Auth/LoginPage";
import Register from "./component/Auth/RegisterPage";
import SortTable from "./component/SortTable";
import View from "./component/View";
import Carousel from "./component/Carousel/Carousel";
import ImageQuill from './component/WriteTest';
import HtmlToPng from "./component/Test/HtmlToPng";
import Searchbar from './component/Test/SearchBarTest'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/post" component={Post} />
          <Route path="/write" component={Write} />
          <Route path="/test" component={HtmlToPng} />
          <Route path="/quill" component={Quill} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/sorttable" component={SortTable} />
          <Route path="/viewer" component={View} />
          <Route path="/carousel" component={Carousel} />
          <Route path="/quilltest" component={ImageQuill} />
          <Route path="/searchbar" component={Searchbar} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
