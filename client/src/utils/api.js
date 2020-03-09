import axios from 'axios';

export default {
  getUser: () => axios.get('/api/user'),

  // Categories
  createCategory: category => axios.post('/api/category', category),
  getCategories: () => axios.get('/api/category'),
  updateCategory: (id, category) => axios.put(`/api/category/${id}`, category),
  deleteCategory: id => axios.delete(`/api/category/${id}`)
};
