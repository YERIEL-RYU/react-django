import React, { useState, useEffect } from "react";
import ListPresenter from "./ListPresenter";
import axios from "axios";
import { useHistory } from "react-router";

const ListContainer = () => {
  const history = useHistory();
  const url = `http://localhost:8000/post/blog/?ordering=-updated_at`;
  const [posts, setPosts] = useState([]);
  const onWrite = () => {
    history.push("/write");
  };
  const onPost = (id) => {
    history.push({
      pathname: `/post/${id}`,
      pushState: { id: id, listLen: posts.length },
    });
    localStorage.setItem("postId", id);
  };
  const onList = () => {
    axios.get(url).then((response) => {
      setPosts(response.data.data);
      localStorage.setItem("postLen", response.data.postLen.id);
    });
  };
  useEffect(() => {
    onList();
  }, []);
  return <ListPresenter onPost={onPost} onWrite={onWrite} posts={posts} />;
};

export default ListContainer;
