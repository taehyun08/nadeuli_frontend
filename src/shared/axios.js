import axios from "axios";

export const instance = axios.create({
  baseURL: "http://54.180.121.151"
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const login = async (users) => await instance.post("/api/user/login", users);
export const register = async (users) => await instance.post("/api/user/signup", users);
export const editProfile = async (userImg, nickname, userLocation) => await instance.put("/api/user/edit", {userImg, nickname, userLocation});
export const loadProfile = async () => await instance.get("/api/user/me");