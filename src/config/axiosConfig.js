import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["X-Frame-Options"] = "sameorigin";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      console.log(error);
      reject(error);
    });
  }
);
