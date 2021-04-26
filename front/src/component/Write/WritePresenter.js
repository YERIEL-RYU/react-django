import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button, Checkbox, Input } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
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
const WritePresenter = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [important, setImportant] = useState(false);

  const postId = localStorage.getItem("postId");
  const local = localStorage.getItem("title");

  var quillRef = useRef();
  const linkHandler = ()=>{
    const quill = quillRef.current.getEditor();
    var href = prompt('Enter the URL');
    if(href !== null) {
      
      if (!href.includes('http') && !href.includes('https://')){
        href = `https://${href}`
      }
      const range = quill.getSelection();
      console.log(range)
      if(range.length === 0){
        quill.insertText(range.index, href, {link:href})
      }
      else{
        quill.format('link', href)
      }   
    }
  }
  const modules = useMemo(()=>({
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }], 
        [
          { list: "ordered" },
          { list: "bullet" },
        ],
        ["link", "image"],
        ['clean']  
      ],
      handlers : {
        link:linkHandler
      }
    },
    imageDropAndPaste: true,
    ImageResize: { modules: [ 'Resize' ]},
    clipboard: { matchVisual: false },
  }),[]);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];


  useEffect(() => {
    if (localStorage.getItem("title")) {
      setTitle(localStorage.getItem("title"));
      setValue(localStorage.getItem("body"));
      setImportant(localStorage.getItem("imp") === "true");
    }
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeValue = useCallback((content, delta, source, e) => {
    setValue(e);
    console.log(delta)
  }, []);

  const onCheckToggle = () => {
    setImportant(!important);
  };
  const onPost = () => {
    console.log("post");
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
  const onModify = () => {
    console.log("modify");
    axios
      .put(`http://localhost:8000/post/${postId}/`, {
        title: title,
        body: value,
        writer: "yeriel",
        important: important,
      })
      .then((res) => console.log(res))
      .then(history.push("/"));
    delete localStorage.title;
    delete localStorage.body;
    delete localStorage.imp;
  };
  const onCancel = () => {
    console.log("cancel");
    delete localStorage.title;
    delete localStorage.body;
    delete localStorage.imp;
    history.push("/");
  };
  return (
    <div>
      <Title
        fullWidth
        placeholder="제목을 입력하세요."
        value={title || ""}
        onChange={onChangeTitle}
      />
      <ReactQuill
        id="react-quill"
        style={{ height: "400px", margin: "30px", padding: "10px" }}
        ref={(el)=>{quillRef.current=el}}
        value={value}
        ref={(el) => {quillRef.current = el}}
        onChange={(content, delta, source, editor) =>
          onChangeValue(content, delta, source, editor.getHTML())
        }
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
