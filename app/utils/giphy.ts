// utils/giphy.ts
import axios from 'axios';

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search';

export const fetchGifs = async (query: string, limit: number = 3, offset: number = 0) => {
  const response = await axios.get(GIPHY_URL, {
    params: {
      api_key:"034gVoFHIr04q0rGzTKIDttMiZ0L0Eci",
      q: query,
      limit: limit,
      offset: offset,
      rating: 'G',
      lang: 'en',
    },
  });
  console.log(response.data.data)
  return response.data.data;
};