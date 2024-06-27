import axios from 'axios';

const api = axios.create({
  baseURL: 'https://books-api-hyqf.onrender.com/', // replace with your backend URL
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

export default api;