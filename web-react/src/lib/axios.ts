import axios from 'axios';

export const api = axios.create({
  baseURL: "http://[::1]:8080",
  headers: {
    "Content-Type": "application/json",
  },
});