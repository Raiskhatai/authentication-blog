const Blogs = require("../models/blogs");

const addBlogs = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Please enter in all fileds",
      });
    }

    if (tags !== undefined && tags.length === 0) {
      return res.status(400).json({
        message: "Please enter atleast one tag",
      });
    }

    const author = req.user.id;

    const blog = await Blogs.create({ title, content, category, author, tags });

    return res.status(201).json({
      message: "Blog successfully created",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blog = await Blogs.find({ author: req.user.id }).populate("author");
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await Blogs.findById(id);
    if (!singleBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: singleBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blogs.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog updated successFully",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blogs.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog deleted",
      data: deletedBlog,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

module.exports = { addBlogs, getBlogs, getSingleBlog, updateBlog, deleteBlog };
