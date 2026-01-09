import axios from 'axios';

const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// utils/api.js mein dealsAPI object mein yeh functions add karein

export const dealsAPI = {
  // Get all deals for admin
  getAllDeals: async () => {
    try {
      const response = await api.get('/deals/all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get active deals for customers
  getActiveDeals: async () => {
    try {
      const response = await api.get('/deals');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

     createDeal: async (formData) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await api.post('/deals/create', formData, config);
      return response.data;
    } catch (error) {
      console.error('Create deal error:', error);
      throw error;
    }
  },

  // Update existing deal
  updateDeal: async (id, dealData) => {
    try {
      const response = await api.put(`/deals/${id}`, dealData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete deal
  deleteDeal: async (id) => {
    try {
      const response = await api.delete(`/deals/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload deal image
  uploadDealImage: async (formData) => {
    try {
      const response = await api.post('/deals/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};



// Menu API
export const menuAPI = {
  getCategories: () => api.get('/menu/categories'),
  getMenuItems: (params) => api.get('/menu/items', { params }),
  getTopSelling: () => api.get('/menu/top-selling'),
  getMenuItem: (id) => api.get(`/menu/items/${id}`),
  getMenuByCategory: (categoryId) => api.get(`/menu/category/${categoryId}`),
};

// Orders API
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: (params) => api.get('/orders', { params }),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
};

// Deals API
export const dealAPI = {
  getActiveDeals: () => api.get('/deals'),
};

// Admin API
export const adminAPI = {

  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard'),

  // Menu Management
  addMenuItem: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/admin/menu-items', formData, config);
  },
  updateMenuItem: (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.put(`/admin/menu-items/${id}`, formData, config);
  },
  deleteMenuItem: (id) => api.delete(`/admin/menu-items/${id}`),
  getAllMenuItems: (params) => api.get('/admin/menu-items', { params }),
  
  // Category Management
  addCategory: (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/admin/categories', formData, config);
  },
  updateCategory: (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.put(`/admin/categories/${id}`, formData, config);
  },
  getAllCategories: () => api.get('/admin/categories'),
  
  // Order Management
  getAllOrders: (params) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
  getOrderDetails: (id) => api.get(`/admin/orders/${id}`),
  
  // Reports
  getSalesReport: (params) => api.get('/admin/reports/sales', { params }),
  
  // User Management
  getAllUsers: (params) => api.get('/admin/users', { params }),
 


};

export default api;



