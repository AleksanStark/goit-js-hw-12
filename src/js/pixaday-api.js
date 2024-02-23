import axios from 'axios';

export const fetchPosts = async (searchValue, page, limit) => {
  const params = new URLSearchParams({
    key: '42464755-f7d199d1a91f6070a7f813e04',
    image_type: 'photo',
    orientation: 'horizontal',
    q: `${searchValue}`,
    safesearch: true,
    page: page,
    per_page: limit,
  });
  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  return response.data;
};
