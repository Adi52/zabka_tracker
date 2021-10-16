import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:1337";
} else {
  axios.defaults.baseURL = "http://localhost:1337"; // todo: change it when backend will be on heroku
}
