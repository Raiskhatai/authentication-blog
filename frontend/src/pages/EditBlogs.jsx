import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const EditBlogs = () => {
  const { id } = useParams();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const handleBlogdata = async (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...blogData,
      tags: blogData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };
    const response = await api.put(`/blog/${id}`, updatedData);
    setBlogData({
      title: "",
      content: "",
      category: "",
      tags: "",
    });
  };

  return (
    <div className="px-20 py-6">
      <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col ">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="change title"
            className="border border-gray-500 rounded-md pl-4"
            value={blogData.title}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            placeholder="change content"
            className="border border-gray-500 rounded-md pl-4"
            value={blogData.content}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            placeholder="change category"
            className="border border-gray-500 rounded-md pl-4"
            value={blogData.category}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="change tags"
            className="border border-gray-500 rounded-md pl-4"
            value={blogData.tags}
            onChange={handleBlogdata}
          />
        </div>

        <button type="submit" className="text-white bg-gray-400 rounded-2xl">
          Submit change
        </button>
      </form>
    </div>
  );
};

export default EditBlogs;
