// src/api/reportItemService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/report-items';
const API_BASE_URL_POST = 'http://localhost:8080/api/posts';
const API_BASE_URL_COMMENT = 'http://localhost:8080/api/comments';

const token = localStorage.getItem('token');
const headers = {"Authorization" : `Bearer ${token}`}

export const getReportItems = async () => {
    const response = await axios.get(API_BASE_URL, { headers: headers });
    return response.data;
};

export const getReportItemById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: headers });
    return response.data;
};

export const deleteReportItem = async (id, type, contentId) => {
    if (type === "Post")
        await axios.delete(`${API_BASE_URL_POST}/${contentId}`, { headers: headers });
    else if (type === "Com")
        await axios.delete(`${API_BASE_URL_COMMENT}/${contentId}`, { headers: headers });
    await ignoreReportItem(id);
};

export const ignoreReportItem = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`, { headers: headers });
};

export const getPostByCommentId = async (id) => {
    const response = await axios.get(`${API_BASE_URL_POST}/post-by-com-id/${id}`, { headers: headers });
    return response.data;
};
