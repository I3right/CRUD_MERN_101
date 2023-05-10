import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getUser,getToken } from "./services/authorize";

function App() {
  // รับบทความจาก axios เก็บใน state (object in array)
  const [blogs, setBlogs] = useState([]);

  // ดึงบทความ มาแสดง
  const fetchData = () => {
    axios
      .get(`${import.meta.env.VITE_APP_KEY}/blogs`)
      .then((Response) => {
        setBlogs(Response.data);
      })
      .catch((error) => {
        Swal.fire("แจ้งเตือน", error, "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ลบบทความ
  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความนี้ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // ยืนยันการลบข้อมูล
      if (result.isConfirmed) {
        // เรียกฟังกชันเพื่อลบข้อความ
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    // ส่ง reqest ไปที่ api เพื่อลบบทความ
    axios
      .delete(`${import.meta.env.VITE_APP_KEY}/blog/${slug}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        // alertbox แสดงผลว่าลบข้อมูลเรียบร้อย
        Swal.fire("Deleted", response.data.message, "success");
        // อัพเดทหน้าเว็บอีกรอบก็คือไปเรียก fetch
        fetchData();
      })
      .catch((error) => {
        Swal.fire(error, "ลบบทความไม่ได้", "error");
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{parse(blog.content.substring(0, 150))}</p>
            <p className="text-muted">
              ผู้เขียน: {blog.author}, วันที่เผยแพร่ข้อมูล:
              {new Date(blog.createdAt).toLocaleString()}
            </p>

            {getUser() && (
              <div>
                <Link
                  to={`/blog/edit/${blog.slug}`}
                  className="btn btn-outline-success"
                >
                  แก้ไขบทความ
                </Link>
                &nbsp;
                <button
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(blog.slug)}
                >
                  ลบบทความ
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
