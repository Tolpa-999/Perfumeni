// src/utils/api.js
import axios from 'axios';

const API_URL = 'https://perfum-backend.vercel.app';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

// Fetch reviews API
export const fetchReviewsApi = async (productId, page, limit) => {
  const response = await axios.get(
    `${API_URL}/reviews/${productId}?page=${page}&limit=${limit}`
  );
  return response.data.data;
};

export const addReviewApi = async (productId, reviewData) => {
  try {
    const response = await axios.post(
      `${API_URL}/reviews/${productId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    // Handle errors by throwing them for further handling in the component
    throw new Error(error.response?.data?.message || "Failed to add review.");
  }
};

// Add more API functions as needed
