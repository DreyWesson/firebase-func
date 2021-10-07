import axios from "./axios";

// This is important for our routes auth.middleware to work
axios.interceptors.request.use((req) => {
  if (localStorage.getItem("FBIdToken")) {
    const FBIdToken = `Bearer ${
      JSON.parse(localStorage.getItem("FBIdToken")).token
    }`;
    req.headers.authorization = FBIdToken;
    // globals
    axios.defaults.headers.common["Authorization"] = FBIdToken;
  }
  return req;
});

// Posts APIs
export const fetchPosts = async () => await axios.get("/posts");
export const getSinglePost = async (postId) =>
  await axios.get(`/posts/${postId}`);
export const newPost = async (newPost) => await axios.post("/posts", newPost);
export const favPost = async (postId) =>
  await axios.get(`/posts/${postId}/like`);
export const delPost = async (postId) => await axios.delete(`/posts/${postId}`);
export const unFavPost = async (postId) =>
  await axios.get(`/posts/${postId}/unlike`);
export const createComment = async (postId, commentData) =>
  await axios.post(`/posts/${postId}/comment`, commentData);
export const fetchUserPosts = async (userHandle) =>
  await axios.get(`/posts/${userHandle}`);

// Users APIs
export const signIn = async (userData) => await axios.post("/login", userData);
export const createAccount = (newUserData) =>
  axios.post("/signup", newUserData);
export const fetchPUserData = async () => await axios.get("/user");
export const imageUpload = async (formData) =>
  await axios.post("/user/image", formData);
export const editDetails = async (userDetails) =>
  await axios.post("/user", userDetails);
export const read = async (notificationId) =>
  await axios.post("/posts", notificationId);
export const signOut = async () =>
  delete axios.defaults.headers.common["Authorization"];
export const handler = async (handle) => await axios.get(`/user/${handle}`);
