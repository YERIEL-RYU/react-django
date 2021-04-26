import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", title: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  apiPostNewsImage(formdata) {
    var path = null;
    axios.post("http://localhost:8000/image/", formdata).then((response) => {
      path = response.data;
    });
    return path;
  }

  imageHandler() {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = this.quill.getSelection(true);

      const res = await axios.post("http://localhost:8000/image/", formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      // Remove placeholder image
      this.quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      this.quill.insertEmbed(range.index, "image", res.data.image);
      this.quill.setSelection(range.index + 1);
    };
  }
  linkHandler = (link)=>{
    // const a = document.createElement("a");
    if(link) {
      var href = prompt('Enter th URL');
      console.log(href)
      this.quill.format('link', href);
      
    }else {
      this.quill.format('link', false)
    }
  }

  render() {
    return (
      <div className="text-editor">
        {JSON.stringify(this.state.editorHtml)}
        <hr />
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <ReactQuill
          ref={(el) => {
            this.quill = el;
          }}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={{
            toolbar: {
              container: [
                [
                  { header: "1" },
                  { header: "2" },
                  { header: [3, 4, 5, 6] },
                  { font: [] },
                ],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "video"],
                ["link", "image", "video"],
                ["clean"],
                ["code-block"],
              ],
              handlers: {
                image: this.imageHandler,
                link : function(value) {
                  if (value) {
                      var href = prompt('Enter the URL');
                      this.quill.format('link', href);
                  } else {
                      this.quill.format('link', false);
                  }
                }
              },
            },
          }}
        />
      </div>
    );
  }
}

export default MyComponent;
