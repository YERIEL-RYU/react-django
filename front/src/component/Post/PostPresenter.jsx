import React from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const Title = styled.div`
  background-color: #eee;
  width: 100%;
  height: 50px;
  font-size: large;
  padding: 15px;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;
const Writer = styled.div``;
const Date = styled.div``;
const Content = styled.div`
  height: 350px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;
const ManageButtonWrap = styled.div`
  display: flex;
  width: 160px;
  justify-content: space-between;
`;
const ButtonWrap = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`;
const PostPresenter = (props) => {
  const { onList, onNext, onPrev, post, onDelete, onModify } = props;
  return (
    <>
      {post !== undefined && (
        <>
          <Title>{post.title}</Title>
          <Divider />
          <Info>
            <Writer>{post.writer}</Writer>
            <Date>{post.updated_at}</Date>
          </Info>
          <Divider />
          <Content dangerouslySetInnerHTML={{ __html: post.body }}></Content>
          <Divider />
          <ButtonContainer>
            <ManageButtonWrap>
              <Button variant="contained" onClick={onModify}>
                수정
              </Button>
              <Button variant="contained" color="secondary" onClick={onDelete}>
                삭제
              </Button>
            </ManageButtonWrap>
            <ButtonWrap>
              <Button variant="contained" color="primary" onClick={onPrev}>
                이전글
              </Button>
              <Button variant="contained" color="primary" onClick={onList}>
                목록
              </Button>
              <Button variant="contained" color="primary" onClick={onNext}>
                다음글
              </Button>
            </ButtonWrap>
          </ButtonContainer>
        </>
      )}
    </>
  );
};

export default PostPresenter;
