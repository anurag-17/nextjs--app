// pages/api/getProducts.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios({
      method: req.method,
      url: 'https://e-commerce-backend-brown.vercel.app/api/auth/createProduct',
      data: req.body,
    });

    // Pass the response from the external API back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

