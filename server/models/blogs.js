/*
  เก็บข้อมูล 4 ตัว 1.ชื่อบทความ(title)  2.เนื้อหา(content)  3.ผู้เขียน(author),slug(url)   4.เวลา
  slug(url): ช่วยให้ url อ่านง่ายมากขึ้นเชีน url มีเว้นspace ซึ่งมันจะแทนที่space จาก % => -
*/

const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: {},
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blogs',blogSchema)