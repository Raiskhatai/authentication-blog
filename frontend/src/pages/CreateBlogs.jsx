import React, { useState } from "react";
import api from "../api/axios";

const CreateBlogs = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const handleBlogdata = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(blogData);

  const handleSubmitdata = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...blogData,
      tags: blogData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };
    try {
      const response = await api.post("/blog", updatedData);

      setBlogData({
        title: "",
        category: "",
        tags: "",
        content: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-20 py-4 min-h-screen">
      <form
        action=""
        className="grid grid-cols-3 gap-4"
        onSubmit={handleSubmitdata}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-xl font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="enter Title"
            className="border border-white rounded-sm pl-4 py-2"
            value={blogData.title}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-xl font-semibold">
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Enter Category"
            className="border border-white rounded-sm pl-4 py-2"
            value={blogData.category}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="tags" className="text-xl font-semibold">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            placeholder="Enter Tags"
            className="border border-white rounded-sm pl-4 py-2"
            value={blogData.tags}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-xl font-semibold">
            Content
          </label>
          <textarea
            type="text"
            name="content"
            placeholder="Enter content"
            className="border border-white rounded-sm pl-4 py-2"
            value={blogData.content}
            onChange={handleBlogdata}
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-gray-300 cursor-pointer px-4 py-2 w-fit h-fit flex justify-center items-center text-black font-semibold rounded-full "
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogs;
