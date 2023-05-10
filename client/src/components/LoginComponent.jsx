import React, { useState,useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import {authenticate, getUser} from '../services/authorize.js'
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate=useNavigate()
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  // destucturing state for easier use
  const { username, password } = state;

  // eventhandler set state for input(state)
  // able to type value on input
  const inputValue = (name) => (event) => {
    // console.log(name, '=', event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    await axios
      .post(`${import.meta.env.VITE_APP_KEY}/login`, { username, password })
      .then((response) => {
        // console.log(response);
        Swal.fire("Success", "ลงชื่อเข้าใช้เรียบร้อย", "success");
        authenticate(response,()=>navigate('/'))
      })
      .catch((error) => {
        Swal.fire("แจ้งเตือน!", error.response.data.error, "error");
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เข้าสู่ระบบ | Admin</h1>
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <button type="submit" value="เข้าสู่ระบบ" className="btn btn-primary">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
