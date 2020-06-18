import axios from 'axios';

const api = axios.create({
  baseURL: process.env.CASE_APP_JS_API_URL || '/casemng/api/',
  timeout: 15000,
});

export default api;
