import React , {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
import WritePresenter from './WritePresenter';
import axios from "axios";
import { useHistory } from "react-router";
import Quill from 'quill'
import "react-quill/dist/quill.snow.css";
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import ImageResize from '@looop/quill-image-resize-module-react'
import {debounce} from 'loadsh'

Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)
Quill.register('modules/ImageResize', ImageResize)
const WriteContainer = () => {
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
          link : linkHandler
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
    
    const onChangeTitle = (e)=>{
      setTitle(e.target.value)
    }
  
    const onChangeValue = useCallback((e) => {
      setValue(e);
    //   console.log(delta)
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
        <WritePresenter
         value={value}
         title={title}
         important={important}
         local={local}
         quillRef={quillRef}
         modules={modules}
         formats={formats}
         onChangeTitle={onChangeTitle}
         onChangeValue={onChangeValue}
         onCheckToggle={onCheckToggle}
         onPost={onPost}
         onModify={onModify}
         onCancel={onCancel}
        />

    );
};

export default WriteContainer;