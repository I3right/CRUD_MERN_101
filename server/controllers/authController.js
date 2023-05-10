const jwt = require("jsonwebtoken");
const  {expressjwt}  = require("express-jwt");

exports.login = (req, res) => {
  // ข้อมูล username, password ส่งมาจาก user
  const { username, password } = req.body;
  // console.log(username, password, req.body);
  // ตรวจสอบ password ที่ป้อนมาเทียบกับ env
  if (password === process.env.PASSWORD) {
    // ให้ login เข้าสู่ระบบ และสร้าง token ให้ user โดยมอายุ 1วัน
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    res.status(400).json({ error: "username, password ไม่ถูกต้อง" });
  }
};

// ตรวจสอบ token
exports.requireLogin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
