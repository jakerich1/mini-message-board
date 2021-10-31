const axios = require('axios');

const axios2 = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-fe')
    }
});

// Post handling

export const fetchPosts = async (page) => {
    return axios2.get(`post/?page=${page}`)
}

export const fetchMyPosts = async (page) => {
    return axios2.get(`user/myposts`);
}

export const submitPost = async (content) => {
    return axios2.post(`post/`, { content: content});
}

export const likePost = async (postId) => {
    return axios2.post(`post/${postId}/like`, {});
}

export const fetchPostInfo = async (postId) => {
    return axios2.get(`post/${postId}/info`);
}

export const fetchUserPosts = async (userId) => {
    return axios2.get(`user/${userId}/posts`);
}

// Comment handling

export const fetchComments = async (postId) => {
    return axios2.get(`comment/?postId=${postId}`);
}

export const submitComment = async (content, postId) => {
    return axios2.post(`comment/`, { content: content, postId: postId, });
}

export const likeComment = async (commentId) => {
    return axios2.post(`comment/${commentId}/like`, {});
}

export const fetchCommentInfo = async (commentId) => {
    return axios2.get(`comment/${commentId}/info`);
}

// Friend request handling

export const fetchRequests = async () => {
    return axios2.get(`user/request`);
}

export const acceptRequest = async (requestId) => {
    return axios2.put(`user/request/${requestId}`, {});
}

export const declineRequest = async (requestId) => {
    return axios2.delete(`user/request/${requestId}`);
}

export const sendFriendRequest = async (userId) => {
    return axios2.post(`user/${userId}/request`, {})
} 

export const fetchUserRequests = async (userId) => {
    return axios2.get(`user/${userId}/request`)
}

export const fetchUsers = async () => {
    return axios2.get(`user/users`);
}

export const fetchFriendsId = async () => {
    return axios2.get('user/friendsId');
}

export const userInfo = async (userId) => {
    return axios2.get(`user/${userId}`);
}

// Authentication handling

export const callSignIn = async (token) => {
    return axios2.post(`auth/facebook?access_token=${token}`)
}

export const callCheckAuth = async () => {
    return axios2.get('user/')
}