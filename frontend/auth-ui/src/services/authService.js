import api from '../api/axios';

export const login = async (email, password) => {
  const response = await api.post('/Auth/login', { email, password });
  return response.data;
};

export const register = async (fullName, email, password) => {
  const response = await api.post('/Auth/register', {
    fullName,
    email,
    password,
  });

  return response.data;
};
export const getProfile = async () => {
  const response = await api.get('/Auth/profile');
  return response.data;
};
