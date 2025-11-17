import axios from 'axios';

// Use environment variable or fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Important for cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - redirect to login
            window.location.href = '/login';
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    getMe: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
    loginWithGoogle: () => {
        window.location.href = `${API_URL}/auth/google`;
    },
    loginWithGoogleToken: async (credential) => {
        const response = await api.post('/auth/google/verify', { credential });
        return response.data;
    },
};

// Workspace APIs
export const workspaceAPI = {
    getAll: () => api.get('/workspaces'),
    create: (data) => api.post('/workspaces', data),
    update: (id, data) => api.put(`/workspaces/${id}`, data),
    delete: (id) => api.delete(`/workspaces/${id}`),
};

// Project APIs
export const projectAPI = {
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
};

// Task APIs
export const taskAPI = {
    create: (data) => api.post('/tasks', data),
    update: (id, data) => api.put(`/tasks/${id}`, data),
    delete: (taskIds) => api.delete('/tasks', { data: { taskIds } }),
    addComment: (id, content) => api.post(`/tasks/${id}/comments`, { content }),
};

export default api;
