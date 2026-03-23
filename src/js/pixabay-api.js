import axios from "axios";


export async function getImagesByQuery(query, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '55046139-0926bc9d71fa83e7a7b72101e';
    const PER_PAGE = 15;
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page: PER_PAGE,
    };
    
     try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}