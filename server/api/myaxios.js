const axios = require('axios')

// ZOMATO
const AX_ZOMATO = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1',
  headers: {
    user_key: process.env.ZOMATO_API
  }
});

// ANOTHER API GOES HERE

module.exports = {
    AX_ZOMATO,
};