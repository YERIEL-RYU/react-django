import React, { useEffect, useState } from "react";
import PostPresenter from "./PostPresenter";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";

const PostContainer = () => {
  const history = useHistory();
  const location = useLocation();

  const postId = Number(localStorage.getItem("postId"));
  const listLen = localStorage.getItem("postLen");
  const url = `http://localhost:8000/post/${postId}/`;

  const [post, setPost] = useState();

  useEffect(() => {
    onPost();
  }, []);
  useEffect(() => {
    onPost();
  }, [postId]);

  const onPost = () => {
    axios
      .get(url)
      .then((response) => setPost(response.data))
      .catch((error) => alert(error.response));
  };

  const onList = () => {
    history.push("/");
  };
  const onNext = () => {
    if (postId < listLen) {
      history.push({
        pathname: `/post/${postId + 1}`,
        pushState: { id: postId + 1, listLen: listLen },
      });
      localStorage.setItem("postId", postId + 1);
    } else {
      alert("마지막 글입니다.");
    }
  };
  const onPrev = () => {
    if (postId > 1) {
      history.push({
        pathname: `/post/${postId - 1}`,
        pushState: { id: postId - 1, listLen: listLen },
      });
      localStorage.setItem("postId", postId - 1);
    } else {
      alert("첫 번째 글입니다.");
    }
  };
  return (
    <PostPresenter
      onList={onList}
      onNext={onNext}
      onPrev={onPrev}
      listLen={listLen}
      post={post}
    />
  );
};

export default PostContainer;
