import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://127.0.0.1:3000/api/v1"});

// Bearerトークンをaxiosのデフォルトヘッダーに格納
if (localStorage.auth_token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.auth_token}`
}

export default axiosInstance