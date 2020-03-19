import axios from 'axios';

export default {
  //User
  getUser: () => axios.get('/api/user'),

  /** Get all records of a User
   * @param {string} userId
   * @returns {Promise[Record]}
   */
  getUserRecords: userId => axios.get(`/api/record/${userId}/record`),
  createRecord: record => axios.post('/api/record/', record),
  editRecord: record => axios.put('/api/record/', record),
  deleteRecord: recordId => axios.delete(`/api/record/${recordId}`),
  // Categories
  createCategory: category => axios.post('/api/category', category),
  getCategories: () => axios.get('/api/category'),
  updateCategory: (id, category) => axios.put(`/api/category/${id}`, category),
  deleteCategory: id => axios.delete(`/api/category/${id}`)
};
