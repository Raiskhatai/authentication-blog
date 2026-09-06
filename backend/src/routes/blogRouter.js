const express = require("express");
const {
  addBlogs,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const router = express.Router();

router.post("/blog", addBlogs);
router.get("/blog", getBlogs);
router.get("/blog/:id", getSingleBlog);
router.put("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);

module.exports = router;
