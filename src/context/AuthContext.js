import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      
      toast.success('Login successful');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  // const register = async (userData) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/register', userData);
  //     const { token, user: userData } = response.data;
      
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(userData));
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     setUser(userData);
      
  //     toast.success('Registration successful');
  //     return { success: true };
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Registration failed');
  //     return { success: false, error: error.response?.data?.message };
  //   }
  // };


const register = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      formData
    );

    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);

    toast.success('Registration successful');
    return { success: true };
  } catch (error) {
    console.log("REGISTER ERROR FULL:", error);
    console.log("REGISTER ERROR RESPONSE:", error.response);

    toast.error(error.response?.data?.message || 'Registration failed');
    return {
      success: false,
      error: error.response?.data?.message
    };
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('http://localhost:5000/api/auth/profile', profileData);
      const updatedUser = { ...user, ...response.data.user };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      return { success: false };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};