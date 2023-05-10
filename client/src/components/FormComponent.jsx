import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser,getToken } from "../services/authorize";
import { useNavigate } from "react-router-dom";



function FormComponent() {
  const navigate=useNavigate()
  // set state as object
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  
  // destucturing state for easier use
  const { title, author } = state;
  
  // react-quill
  const [content, setContent] = useState("");

  // eventhandler set state for input(state) || able to type value on input
  const inputValue = (name) => (event) => {
    // console.log(name, '=', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) =>{
    setContent(event)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_KEY}/create`, {
        title,
        content,
        author,
      },{headers:{
        Authorization : `Bearer ${getToken()}`
      }})
      .then((response) => {
        // sweet alert on succes
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลบทความเรียบร้อย", "success");
        setState({ ...state, title: "", author: "" });
        setContent('')
      })
      .catch((error) => {
        // sweet alert on fail
        Swal.fire("แจ้งเตือน", error.response.data.error, "error");
      });
  };




  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เขียนบทความ</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="เขียนบทความ"
            style={{border:'1px solid #efefef'}}
          />
        </div>
        <div className="form-group">
          <label>ผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <button type="submit" value="save" className="btn btn-primary">
          บันทึก
        </button>
      </form>
    </div>
  );
}

export default FormComponent;
