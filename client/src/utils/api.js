import axios from 'axios';

export default {
  //User
  getUser: () => axios.get('/api/user'),
  createUser: user => axios.post('api/user', user),

  // Categories
  createCategory: category => axios.post('/api/category', category),
  getCategories: () => axios.get('/api/category'),
  updateCategory: (id, category) => axios.put(`/api/category/${id}`, category),
  deleteCategory: id => axios.delete(`/api/category/${id}`)
};
