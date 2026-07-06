import api from '../api/axios';

export const savePoint = async (geometry) => {
  return await api.post('/points', { geometry });
};

export const saveLine = async (geometry) => {
  return await api.post('/lines', { geometry });
};

export const savePolygon = async (geometry) => {
  return await api.post('/polygons', { geometry });
};

export const deletePoint = async (id) => {
  return await api.put(`/points/${id}/delete`);
};

export const deleteLine = async (id) => {
  return await api.put(`/lines/${id}/delete`);
};

export const deletePolygon = async (id) => {
  return await api.put(`/polygons/${id}/delete`);
};

export const getPoints = async () => {
  return await api.get('/points');
};

export const getLines = async () => {
  return await api.get('/lines');
};

export const getPolygons = async () => {
  return await api.get('/polygons');
};
