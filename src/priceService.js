const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/products/';

async function fetchProductPrice(productName) {
    try {
        const response = await axios.get(`${API_BASE_URL}${productName}`);
        return response.data.price;
    } catch (error) {
        throw new Error(`Error fetching price for ${productName}`);
    }
}

module.exports = { fetchProductPrice };
