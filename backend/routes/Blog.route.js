const express = require('express')
const router = express.Router();
const { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } = require('../controllers/Blog.controller');
const { blogComment, getComments } = require("../controllers/BlogComment.controller")
router.get('/', getAllBlogs)
router.post('/add', addBlog)
router.put('/update/:id', updateBlog)
router.get('/:id', getById)
router.delete('/:id', deleteBlog)
router.get('/user/:id', getByUserId)
router.post("/comment/:id", blogComment)
router.get("/comment/:id", getComments)





module.exports = router