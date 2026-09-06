import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:4000",
});

userApi.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("userAuth");
    const token = JSON.parse(authToken)?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("auth-req-errr", error);
  },
);

userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("userAuth");
      window.location.href = "/login";
    }
  },
);

export default userApi;
