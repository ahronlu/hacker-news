import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/",
});

export const source = axios.CancelToken.source();
