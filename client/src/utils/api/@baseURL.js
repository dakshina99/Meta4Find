import axios from "axios";
const url ="http://localhost:8000/"
let baseApi = "/";

if (url) {
  baseApi = axios.create({
    baseURL: url,
    headers: {
      "Content-Type":"application/json"
    },
  });
}

export default baseApi;
