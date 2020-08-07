import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.108:3333'//server|api
});

export default api;