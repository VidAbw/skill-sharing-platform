// api.js
import axios from '../api/axiosInstance';

const API_URL = 'http://localhost:8080/api';

// Learning Progress API calls
export const getAllLearningProgress = () => {
  return axios.get('/learning-progress');
};

export const getLearningProgressByUser = (userId) => {
  return axios.get(`/learning-progress/user/${userId}`);
};

export const createLearningProgress = (progressData) => {
  return axios.post('/learning-progress', progressData);
};

export const updateLearningProgress = (id, progressData) => {
  return axios.put(`/learning-progress/${id}`, progressData);
};

export const deleteLearningProgress = (id) => {
  return axios.delete(`/learning-progress/${id}`);
};

export const getLearningProgressById = (id) => {
  return axios.get(`/learning-progress/${id}`);
};

export const fetchProgress = async () => {
    try {
        const response = await axios.get('/progress');
        return response.data;
    } catch (error) {
        console.error('Error fetching progress:', error);
        throw error;
    }
};

// Travel Guide API calls
export const getAllTravelGuides = () => {
  return axios.get('/travel-guides');
};

export const getTravelGuideById = (id) => {
  return axios.get(`/travel-guides/${id}`);
};

export const searchTravelGuidesByDestination = (destination) => {
  return axios.get(`/travel-guides/destination?search=${destination}`);
};

export const searchTravelGuidesByTopic = (topic) => {
  return axios.get(`/travel-guides/topic?search=${topic}`);
};

export const createTravelGuide = (guideData) => {
  return axios.post('/travel-guides', guideData);
};

export const updateTravelGuide = (id, guideData) => {
  return axios.put(`${API_URL}/travel-guides/${id}`, guideData);
};
