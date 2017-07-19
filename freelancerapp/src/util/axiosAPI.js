var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  /* other custom settings */
});

module.exports = axiosInstance;