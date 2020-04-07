import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {
  signin = user => {
    return axios
      .post('api/auth/signin', user)
      .then(res => this.handleResToken(res));
  };

  signup = user => {
    return axios
      .post('/api/auth/signup', user)
      .then(res => this.handleResToken(res));
  };

  getProfile = () => {
    const token = this.getToken();
    let expired = this.isTokenExpired(token);
    try {
      return !expired && token ? decode(token) : null;
    } catch (err) {
      console.log('AuthService / getProfile - err:', err);
    }
  };

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
    localStorage.setItem('id_token', idToken);
  }

  setTokenToHeader() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.getToken()}`;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('id_token');
  }

  googlePassportToken(token) {
    return axios
      .get(`/api/auth/token/${token}`)
      .then(res => this.handleResToken(res));
  }

  /** helper */
  handleResToken({ data }) {
    if (data.token) {
      this.setToken(data.token);
      return null;
    }
    return data;
  }
}
