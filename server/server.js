const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')

const app = express();

// 7. เชื่อม cloud DB ~ MonGoose
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
}).then(()=>console.log('Connected'))
.catch((Error)=>console.log(Error));

// Middle ware ส่วนที่ทำงานร่วมกับ express
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // ใช้ดัก request

// Route 
app.use('/api',blogRoute)
app.use('/api',authRoute)


const port = process.env.PORT || 8080;
// ถ้าใน env ไม่มีกำหนด port ให้สำรองเป็น 8080

app.listen(port, () => {
  console.log(`Start server in port : ${port}`);
});
