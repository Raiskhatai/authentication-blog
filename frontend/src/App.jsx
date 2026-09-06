import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import CreateBlogs from "./pages/CreateBlogs";
import EditBlogs from "./pages/EditBlogs";
import Home from "./pages/Home";
import Myblogs from "./pages/Myblogs";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="">
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/create-blog" element={<CreateBlogs />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/edit-blog" element={<EditBlogs />} />
          <Route path="myblogs" element={<Myblogs />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
