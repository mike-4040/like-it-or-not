import axios from 'axios';

export default {
  // Admin role change
  getAllUsers: () => axios.get('/api/admin'),
  updateRole: userUpdates => axios.put('/api/admin', userUpdates),
  deleteUser: userId => axios.delete(`/api/admin/${userId}`),
  //User
  getUser: userId => axios.get(`/api/user/${userId}`),
  updateUser: userUpdates => axios.put(`/api/user`, userUpdates),
  //  this method shows error CORS
  uploadAvatar: file =>
    axios.post('https://api.cloudinary.com/v1_1/lionapp/image/upload/', file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  /** Get all records of a User
   * @param {string} userId
   * @returns {Promise} record
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
