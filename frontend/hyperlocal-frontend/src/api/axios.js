import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7050/api',
});

export default API;