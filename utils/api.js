import axios from 'axios';
import { API_URL } from './config';

const BASE_URL = API_URL;

// Common function to make GET requests
export async function fetchApiData(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response;
  } catch (error) {
    throw error;
  }
}

// Common function to make POST requests with an authentication token
export async function postApiData(endpoint, data) {
  try {
    const authToken = sessionStorage.getItem('authToken');

    const headers = {
      Authorization: `Bearer ${authToken}`, 
      'Content-Type': 'application/json', 
    };

    const response = await axios.post(`${BASE_URL}/${endpoint}`, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

