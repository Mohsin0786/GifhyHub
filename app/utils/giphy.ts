// utils/giphy.ts
import axios from 'axios';


const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search';

export const fetchGifs = async (query: string, limit: number = 3, offset: number = 0) => {
  const response = await axios.get(GIPHY_URL, {
    params: {
      api_key: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
      q: query,
      limit: limit,
      offset: offset,
      rating: 'G',
      lang: 'en',
    },
  });
  return response.data.data;
};