// import { API_URL, AccessToken } from "./urls";

const API_URL = "https://e-commerce-backend-brown.vercel.app/api/auth"
// const AccessToken = sessionStorage.getItem("accessToken")
const AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ5MzJjZDk3NGZlZjA3YWQzMmNkZSIsImlhdCI6MTY5NjQ5MTUxMSwiZXhwIjoxNjk2NTc3OTExfQ.efMC5J5pRvTCZFBsR03csd9H9OWavbqihGTriVxWOA4"
export const fetchDataFromApi = async (endpoint) => {
    const options = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + AccessToken,
        },
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();

    return data;
};

export const commonPostApi = async (endpoint, payload) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + AccessToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
};
