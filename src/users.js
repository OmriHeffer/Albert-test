const axios = require('axios');

export function getUserData() {
  const url = 'https://api.myjson.com/bins/162vrt';
  return axios.get(url);
}