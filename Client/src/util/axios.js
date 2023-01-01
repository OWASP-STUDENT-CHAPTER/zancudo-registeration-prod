import axios from "axios";
import URL from "./url";

console.log(URL);

export default axios.create({
  baseURL: URL + "/api",
  responseType: "json",
  withCredentials: true,
});
