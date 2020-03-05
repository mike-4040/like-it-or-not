import axios from 'axios';
export default {
  test: () => axios.get('/api/user')
};
