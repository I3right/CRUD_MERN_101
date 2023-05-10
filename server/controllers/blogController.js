/* ประมวลผล REQ จาก user ว่าจะทำอะไรกับ DB Controller ต้องมี fn สำหรับติดต่อ,จัดการกับ DB */
const slugify = require("slugify");
// ติดต่อกับฐานข้อมูล หรือ ใช้ฐานข้อมูล
const Blogs = require("../models/blogs");
// ใช้ UUID สำหรับ slugที่เป็นค่าว่า(ภาษาไทย)
const { v4: uuidv4 } = require("uuid");

// สร้างบทความ
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  // ถ้า slug เป็นค่าว่าง(ภาษาไทย) ให้ใช้ uuid แทน
  if (!slug) {
    slug = uuidv4();
  }

  // validate
  switch (
    true // true : ตรวจสอบทุกกระณี
  ) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
      break; // ใส่เพื่อไว้กันหลุด
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนรายละเอียด" });
      break;
  }

  // บันทึกข้อมูล
  Blogs.create({ title, content, author, slug })
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(400).json({ error: "มีชื่อบทความซ้ำกัน" });
    });
};

// ดึงข้อมูลทุกตัว
exports.getAllBlogs = (req, res) => {
  Blogs.find({}).then((blog) => {
    res.json(blog);
  });
};

// ดึงบทความสนใจหนึ่งตัว
exports.singleBlog = (req, res) => {
  const {slug} = req.params
  Blogs.findOne({slug})
  .then((blog)=>{
    res.json(blog)
  })
};

// ลบบทความ
exports.remove = (req,res) => {
  const {slug} = req.params
  Blogs.findOneAndRemove({slug})
  .then(res.status(200).json({ message: "ลบบทความเรียบร้อย" }))
}

// อัพเดทบทความ
exports.update = (req,res) => {
  const {slug} = req.params
  const {title,content,author} = req.body
  Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
  .then(blog=>res.json(blog))
  .catch(err=>res.json(err))
}