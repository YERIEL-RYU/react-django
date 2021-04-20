import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Checkbox, Input } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import ReactQuill from "react-quill";
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
  //
`;
const WritePresenter = () => {
  const history = useHistory();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [important, setImportant] = useState(false);
  const postId = localStorage.getItem("postId");
  const local = localStorage.getItem("title");

  var quillRef = useRef();

  function imageHandler() {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    console.log("quillRef : ", quillRef);
    var quill = quillRef.current.getEditor();
    console.log("quill : ", quill);
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = quill.getSelection(true);
      console.log("range", range);
      const res = await axios.post("http://localhost:8000/image/", formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      // Remove placeholder image
      quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      quill.insertEmbed(range.index, "image", res.data.image);
      quill.setSelection(range.index + 1);
    };
  }
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        ["link", "image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: { matchVisual: false },
  };

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
  // useEffect(() => {
  //   console.log("componentDidmount");
  //   quillRef.getEditor().focus();
  // }, [value]);
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeValue = useCallback((content, delta, source, e) => {
    setValue(e);
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
        value={value}
        ref={quillRef}
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
