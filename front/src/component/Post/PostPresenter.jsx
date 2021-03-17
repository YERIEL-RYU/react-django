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
  const { onList, onNext, onPrev, ListLen } = props;
  return (
    <>
      <Title>TITLE</Title>
      <Divider />
      <Info>
        <Writer>yeriel</Writer>
        <Date>today</Date>
      </Info>
      <Divider />
      <Content>내용</Content>
      <Divider />
      <ButtonContainer>
        <ManageButtonWrap>
          <Button variant="contained">수정</Button>
          <Button variant="contained" color="secondary">
            삭제
          </Button>
        </ManageButtonWrap>
        <ButtonWrap>
          <Button variant="contained" color="primary">
            이전글
          </Button>
          <Button variant="contained" color="primary" onClick={onList}>
            목록
          </Button>
          <Button variant="contained" color="primary">
            다음글
          </Button>
        </ButtonWrap>
      </ButtonContainer>
    </>
  );
};

export default PostPresenter;
