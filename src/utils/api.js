// src/utils/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:2000/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const getProducts = async () => {
//   const response = await axiosInstance.get(`${API_URL}/products`);
//   console.log(response.data)
//   return response.data;
// };

export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await axiosInstance.get(`${API_URL}/products?${queryParams}`);
  return response.data;
};


export const getProductById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/products/${id}`);
  return response.data;
};

// Fetch reviews API
export const fetchReviewsApi = async (productId, page, limit) => {
  const response = await axiosInstance.get(
    `${API_URL}/reviews/${productId}?page=${page}&limit=${limit}`
  );
  return response.data.data;
};


export const addReviewApi = async (productId, reviewData) => {
  try {
    const response = await axiosInstance.post(
      `/reviews/${productId}`,
      reviewData
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors by throwing them for further handling in the component
    throw new Error(error?.response?.data?.message || "Failed to add review.");
  }
};

export const deleteReviewApi = async ( productId, reviewId) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/reviews/${productId}/${reviewId}`
    );
    return response.data;
  } catch (error) {
    // Handle errors by throwing them for further handling in the component
    throw new Error(error?.response?.data?.message || "Failed to delete review.");
  }
};

export const signUp = async (userData) => {
  try {

    const response = await axiosInstance.post(`/users/register`, userData);
    // console.log('Sign in data => ', response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Sign In
export const signIn = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/users/login`, credentials);
    // console.log('Sign in data => ', response.data);
    return response.data;
  } catch (error) {
    // await toast.error(error?.response?.data?.message)
    throw error.response.data;
  }
};

export const verifyEmailReq = async (token) => {
  try {
    const response = await axiosInstance.post(`/users/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get User Profile (optional, for protected routes)
export const getUserProfile = async (token) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.get(`/users/refresh`);
    return response.data;
  } catch (error) {
    throw error.response.data
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get(`/users/logout`);
    return response.data;
  } catch (error) {
    throw error.response.data
  }
};


// Add more API functions as needed
