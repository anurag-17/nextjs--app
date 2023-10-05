// import { API_URL, AccessToken } from "./urls";

const API_URL = "https://e-commerce-backend-brown.vercel.app"
// const AccessToken = sessionStorage.getItem("accessToken")
const AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjUwMzY0MSwiZXhwIjoxNjk2NTkwMDQxfQ.ATC61ZqHn9n8Nf7DiqGuNYpVHli5p7CTUcZhiO6cXZA"
export const fetchDataFromApi = async (endpoint) => {
    const options = {
        method: "GET",
        headers: {
            cookie: AccessToken,
            Authorization: "Bearer " + AccessToken,
        },
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();

    return data;
};

export const commonPostApi = async (endpoint, payload) => {
    const url = `${API_URL}${endpoint}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + AccessToken,
            "Content-Type": "application/json",
            cookie: "refreshToken =" + AccessToken,
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Response Data:", data);
    return data;
};
