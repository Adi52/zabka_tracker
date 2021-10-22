import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:1337";
} else {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
}

export const SIGNUP = "/auth/local/register";
export const LOGIN = "/auth/local";
export const CATEGORIES = "/categories";
export const USERS = "/users";
export const MARKERS = "/markers";
