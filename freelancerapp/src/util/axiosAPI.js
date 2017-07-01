var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  /* other custom settings */
});

module.exports = axiosInstance;