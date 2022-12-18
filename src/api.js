import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const params = {
  key: '30554154-3b0c94c508b526685c8ecc515',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 12,
  isImageModalOpen: false,
};

export const fetchImages = async (query, page) => {
  const response = await axios.get(`/?q=${query}&page=${page}`, { params });
  return response.data;
};
