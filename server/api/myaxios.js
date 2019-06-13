const axios = require('axios')

// ZOMATO
const AX_ZOMATO = axios.create({
  baseURL: 'http://localhost:3000',
});

// ANOTHER API GOES HERE

module.exports = {
    AX_ZOMATO,
};