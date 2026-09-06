import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };
  return (
    <div className="w-full h-18 bg-gray-700 flex items-center justify-between px-20 text-lg font-semibold  ">
      <Link to={"/myblogs"}>My-Blogs</Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/create-blog"}>Create-Blog</Link>
      <div
        className="bg-amber-500 px-3 rounded-sm  py-1 uppercase text-[14px] cursor-pointer "
        onClick={handleLogout}
      >
        logout
      </div>
    </div>
  );
};

export default Navbar;
