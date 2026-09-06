import React from "react";
import api from "../api/axios";
import { useEffect } from "react";
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Myblogs = () => {
  const [Blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const handleBlogs = async () => {
    try {
      const { data } = await api.get("/blog");
      console.log(data);
      setBlogs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleBlogs();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/blog/${id}`);
    handleBlogs();
  };

  return (
    <div className="px-20  min-h-screen w-full py-6 ">
      <div className="flex justify-center flex-col items-center gap-3">
        <h1 className="text-4xl font-semibold  ">Welcome to My Blog</h1>
        <p className="text-lg font-normal">
          Explore articles about technology, programming and development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center w-full h-full mt-10 ">
        {Blogs.map((item) => {
          return (
            <div
              key={item._id}
              className="border border-white h-fit w-full px-4 py-4 rounded-sm "
            >
              <h1 className="text-center text-lg font-semibold capitalize mt-4 ">
                {item.title}
              </h1>
              <p className=""> {item.content} </p>
              <div className="flex justify-between w-full my-4 ">
                <div className="bg-gray-500 rounded-full px-2 font-semibold py-1 text-[11px] ">
                  {item.category}
                </div>
                <p className="text-sm">AUTHOR : {item.author.name}</p>
              </div>

              <div className="flex justify-between w-20 h-full">
                <div
                  className="bg-green-500 rounded-full px-2 py-2  cursor-pointer "
                  onClick={() => navigate(`/edit-blog/${item._id}`)}
                >
                  <FaPencilAlt className="" />
                </div>
                <div
                  className="bg-red-500 rounded-full px-2 py-2 cursor-pointer "
                  onClick={() => handleDelete(item._id)}
                >
                  <FaTrash />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myblogs;
