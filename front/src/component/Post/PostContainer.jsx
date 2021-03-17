import React from "react";
import PostPresenter from "./PostPresenter";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

const PostContainer = () => {
  const history = useHistory();
  const location = useLocation();

  const postId = location.state.id;
  const ListLen = location.state.listLen;
  const onList = () => {
    history.push("/");
  };
  const onNext = () => {
    history.push(`/post/${postId + 1}`);
  };
  const onPrev = () => {
    history.push(`push/${postId - 1}`);
  };
  return (
    <PostPresenter
      onList={onList}
      onNext={onNext}
      onPrev={onPrev}
      ListLen={ListLen}
    />
  );
};

export default PostContainer;
