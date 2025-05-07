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

export const getLearningProgressById = (id) => {
  return axios.get(`${API_URL}/learning-progress/${id}`);
};

export const fetchProgress = async () => {
    try {
        const response = await axios.get('/api/progress');
        return response.data;
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
    }
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

export const createTravelGuide = (guideData) => {
  return axios.post(`${API_URL}/travel-guides`, guideData);
};

export const updateTravelGuide = (id, guideData) => {
  return axios.put(`${API_URL}/travel-guides/${id}`, guideData);
};
