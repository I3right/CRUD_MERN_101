import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
import parse from 'html-react-parser'

function SingleComponent() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_KEY}/blog/${slug}`)
      .then((Response) => {
        setBlog(Response.data);
      })
      .catch((error) => {
        Swal.fire("แจ้งเตือน", error, "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>{blog.title}</h1>
      <p>{parse(`${blog.content}`)}</p>
      
      <p className="text-muted">
        ผู้เขียน: {blog.author}, วันที่เผยแพร่ข้อมูล:{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

export default SingleComponent;
