import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://www.vtourhub-backend.com/api/v1"});

// Bearerトークンをaxiosのデフォルトヘッダーに格納
if (localStorage.auth_token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.auth_token}`
}

export default axiosInstance