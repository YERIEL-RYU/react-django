import React, { useState } from "react";
import { Button, Checkbox, Input } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

import ReactQill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";
const Title = styled(Input)`
  margin: 0 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WritePresenter = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [important, setImportant] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeValue = (e) => {
    setValue(e);
  };

  const onCheckToggle = () => {
    setImportant(!important);
  };

  const onPost = () => {
    axios
      .post("http://localhost:8000/post/", {
        title: title,
        body: value,
        writer: "yeriel",
        important: important,
      })
      .then((res) => console.log(res))
      .then(history.push("/"));
  };
  return (
    <div>
      <Title
        fullWidth
        placeholder="제목을 입력하세요."
        value={title}
        onChange={onChangeTitle}
      />
      <ReactQill
        style={{ height: "400px", margin: "30px", padding: "10px" }}
        value={value}
        onChange={onChangeValue}
      />
      <CheckboxContainer>
        <Checkbox value={important} onClick={onCheckToggle} /> 중요
      </CheckboxContainer>
      <ButtonContainer>
        <Button variant="contained">cancel</Button>
        <Button variant="contained" onClick={onPost}>
          post
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default WritePresenter;
