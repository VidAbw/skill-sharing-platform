import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy will forward to Spring Boot
});

// Example: Fetch learning progress updates
export const fetchProgress = () => api.get('/progress');
export const createProgress = (data) => api.post('/progress', data);

export default api;