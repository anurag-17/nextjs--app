// utils/api.js
import { useSelector } from 'react-redux';

const BASE_URL = 'https://e-commerce-backend-brown.vercel.app/api'; 

export const fetchApi = async (url, options = {}) => {
  try {

  const accessToken = localStorage.getItem("userToken")
  
  // const token = useSelector((state) => state);
  
  const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.33.0',
  };
  
  if (accessToken) {
      headers['authorization'] = accessToken ;
    }


    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET', // Change the method as needed (e.g., 'POST', 'PUT', etc.)
      headers,
      ...options,
    });
    
    console.log(headers);

    
    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }
    
    // const data = await response.json();

    return response;
  } catch (error) {
    throw error;
    console.log("notokyy");
    
  }
};
