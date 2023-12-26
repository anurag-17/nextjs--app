// utils/api.js
import { useSelector } from "react-redux";

const BASE_URL = "https://e-commerce-backend-brown.vercel.app/api";

export const fetchApi = async (url, options = {}) => {
  try {
    // const accessToken = JSON.parse(localStorage.getItem("userToken"));
    // const token = useSelector((state) => state);
    const { token } = useSelector((state) => state.auth.userDetails || null);
    const headers = {
      "Content-Type": "application/json",
     "authorization":token
    };

    // if (token) {
    //   headers["authorization"] = token;
    // }    

    
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET", // Change the method as needed (e.g., 'POST', 'PUT', etc.)
      headers,
      ...options,
    });

    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }

    // const data = await response.json();

    return response;
  } catch (error) {
    throw error;
  }
};
