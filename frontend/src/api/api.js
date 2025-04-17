// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Learning Progress API calls
export const getAllLearningProgress = () => {
  return axios.get(`${API_URL}/learning-progress`);
};

export const getLearningProgressByUser = (userId) => {
  return axios.get(`${API_URL}/learning-progress/user/${userId}`);
};

export const createLearningProgress = (progressData) => {
  return axios.post(`${API_URL}/learning-progress`, progressData);
};

export const updateLearningProgress = (id, progressData) => {
  return axios.put(`${API_URL}/learning-progress/${id}`, progressData);
};

export const deleteLearningProgress = (id) => {
  return axios.delete(`${API_URL}/learning-progress/${id}`);
};

// Travel Guide API calls
export const getAllTravelGuides = () => {
  return axios.get(`${API_URL}/travel-guides`);
};

export const getTravelGuideById = (id) => {
  return axios.get(`${API_URL}/travel-guides/${id}`);
};

export const searchTravelGuidesByDestination = (destination) => {
  return axios.get(`${API_URL}/travel-guides/destination?search=${destination}`);
};

export const searchTravelGuidesByTopic = (topic) => {
  return axios.get(`${API_URL}/travel-guides/topic?search=${topic}`);
};
