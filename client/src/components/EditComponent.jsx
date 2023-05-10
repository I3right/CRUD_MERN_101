import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { json, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";

const EditComponent = () => {
  // set state as object
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  // destucturing state for easier use
  const { title, author } = state;
  const [content, setContent] = useState("");

  const submitContent = (event) => {
    setContent(event);
  };

  // eventhandler set state for input(state) || able to type value on input
  const inputValue = (name) => (event) => {
    // console.log(name, '=', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  // ดึง slug จาก params
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_KEY}/blog/${slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content);
      })
      .catch((error) => {
        Swal.fire("แจ้งเตือน", error, "error");
      });
  }, []);

  const showUpdateForm = () => (
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
          style={{ border: "1px solid #efefef" }}
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
      <button type="submit" value="อัพเดท" className="btn btn-primary">
        อัพเดท
      </button>
    </form>
  );

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_APP_KEY}/blog/${slug}`,
        {
          title,
          content,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        // sweet alert on succes
        Swal.fire("แจ้งเตือน", "อัพเดทข้อมูลบทความเรียบร้อย", "success");
        // ตอนออกแบบ api ให้ response ข้อมูลกลับมาด้วย => destruc เพื่อเอา title,content,author
        const { title, content, author } = response.data;
        // set state หลัง update ด้วยค่าที่อัพเดทเสร็จแล้ว
        setState({ ...state, title, author });
        setContent(content);
      })
      .catch((error) => {
        // sweet alert on fail
        Swal.fire("แจ้งเตือน", error.response.data.error, "error");
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponent;
