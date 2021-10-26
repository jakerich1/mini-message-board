const axios = require('axios');

axios.defaults.baseURL = 'http://localhost:5000/';

const headerConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`,
    },
}

// Post handling

export const fetchPosts = async (page) => {
    return axios.get(`post/?page=${page}`, headerConfig)
}

export const fetchMyPosts = async (page) => {
    return axios.get(`user/myposts`, headerConfig);
}

export const submitPost = async (content) => {
    return axios.post(`post/`, { content: content}, headerConfig);
}

export const likePost = async (postId) => {
    return axios.post(`post/${postId}/like`, {}, headerConfig);
}

export const fetchPostInfo = async (postId) => {
    return axios.get(`post/${postId}/info`, headerConfig);
}

// Comment handling

export const fetchComments = async (postId) => {
    return axios.get(`comment/?postId=${postId}`, headerConfig);
}

export const submitComment = async (content, postId) => {
    return axios.post(`comment/`, { content: content, postId: postId, }, headerConfig);
}

export const likeComment = async (commentId) => {
    return axios.post(`comment/${commentId}/like`, {}, headerConfig);
}

export const fetchCommentInfo = async (commentId) => {
    return axios.get(`comment/${commentId}/info`, headerConfig);
}

// Friend request handling

export const fetchRequests = async () => {
    return axios.get(`user/request`, headerConfig);
}

export const acceptRequest = async (requestId) => {
    return axios.put(`user/request/${requestId}`, {}, headerConfig);
}

export const declineRequest = async (requestId) => {
    return axios.delete(`http://localhost:5000/user/request/${requestId}`, headerConfig);
}

// Authentication handling

export const callSignIn = async (token) => {
    return axios.post(`http://localhost:5000/auth/facebook?access_token=${token}`)
}

export const callCheckAuth = async () => {
    return axios.get('http://localhost:5000/user/', headerConfig)
}