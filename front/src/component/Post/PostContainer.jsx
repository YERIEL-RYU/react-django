import React, { useCallback, useEffect, useState } from "react";
import PostPresenter from "./PostPresenter";
import { useHistory } from "react-router";
import axios from "axios";

const PostContainer = () => {
  const history = useHistory();

  const postId = Number(localStorage.getItem("postId"));
  const listLen = localStorage.getItem("postLen");

  const url = `http://localhost:8000/post/blog/${postId}/`;

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
      .then((response) => {
        setPost(response.data);
        localStorage.setItem("post", response.data);
      })
      .catch((error) => alert(error.response));
  };

  const onList = () => {
    history.push("/");
  };
  const onNext = () => {
    console.log("postId : ", postId, "listLen : ", listLen);
    if (postId < listLen) {
      history.push({
        pathname: `/post/${postId + 1}`,
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
  const onDelete = () => {
    const check = window.confirm("해당 공지사항을 삭제하시겠습니까?");
    if (check) {
      axios.delete(url).then((res) => {
        alert("삭제 되었습니다.");
        history.push("/");
      });
    }
  };
  const onModify = useCallback(() => {
    history.push("/write");
    localStorage.setItem("title", post.title);
    localStorage.setItem("body", post.body);
    localStorage.setItem("imp", post.important);
  }, [post]);
  return (
    <PostPresenter
      onList={onList}
      onNext={onNext}
      onPrev={onPrev}
      listLen={listLen}
      post={post}
      onDelete={onDelete}
      onModify={onModify}
    />
  );
};

export default PostContainer;
