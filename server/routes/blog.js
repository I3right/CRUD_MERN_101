// สำำหรับ รับส่ง req,res การสร้างบทความ

const express = require('express');
const router = express.Router();
const {create,getAllBlogs,singleBlog,remove,update} = require('../controllers/blogController')
const {requireLogin} = require('../controllers/authController')


router.post('/create',requireLogin,create)
router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)

router.get('/blogs',getAllBlogs)
router.get('/blog/:slug',singleBlog)


module.exports = router