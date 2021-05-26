import React  from "react";
import { Button, Checkbox, Input } from "@material-ui/core";
import Quill from 'quill'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import ImageResize from '@looop/quill-image-resize-module-react'


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
  //
`;
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/ImageResize', ImageResize)
const WritePresenter = (props) => {
  const {value,
  title,
  important,
  local,
  quillRef,
  modules,
  formats,
  onChangeTitle,
  onChangeValue,
  onCheckToggle,
  onPost,
  onModify,
  onCancel,}= props;
 
  return (
    <div>
      <Title
        fullWidth
        placeholder="제목을 입력하세요."
        value={title || ""}
        onChange={(e)=>onChangeTitle(e)}
        margin="dense"
      />
      {console.log(quillRef)}
      <ReactQuill
        id="react-quill"
        style={{ height: "400px", margin: "30px", padding: "10px" }}
        // ref={(el) => {quillRef.current = el}}
        value={value}
        onChange={onChangeValue}
        modules={modules}
        formats={formats}
        selection={{ start: 0, end: 0 }}
      />
      <CheckboxContainer>
        <Checkbox checked={important} onClick={onCheckToggle} /> 중요
      </CheckboxContainer>
      <ButtonContainer>
        <Button variant="contained" onClick={onCancel}>
          cancel
        </Button>
        <Button
          variant="contained"
          onClick={local === null ? onPost : onModify}
        >
          post
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default WritePresenter;
