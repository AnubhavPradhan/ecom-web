import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'; // your backend base URL

export const fetchAllProducts = async () => {
  const response = await axios.get(`${API_BASE}/product`);
  return response.data;
};
