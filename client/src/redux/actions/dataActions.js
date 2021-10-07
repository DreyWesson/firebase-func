import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  POST_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
// import axios from "axios";
import * as api from "../../api";

// Get all Posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  // axios
  //   .get("/posts")
  api
    .fetchPosts()
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  // axios
  //   .get(`/posts/${postId}`)
  api
    .getSinglePost(postId)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post
export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  // axios
  //   .post("/post", newPost)
  api
    .newPost()
    .then((res) => {
      dispatch({
        type: POST_POST,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Like a Post
export const likePost = (postId) => (dispatch) => {
  // axios
  //   .get(`/posts/${postId}/like`)
  api
    .favPost(postId)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a Post
export const unlikePost = (postId) => (dispatch) => {
  // axios
  //   .get(`/posts/${postId}/unlike`)
  api
    .unFavPost(postId)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  // axios
  //   .post(`/posts/${postId}/comment`, commentData)
  api
    .createComment(postId, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const deletePost = (postId) => (dispatch) => {
  // axios
  //   .delete(`/posts/${postId}`)
  api
    .delPost(postId)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  // axios
  //   .get(`/user/${userHandle}`)
  api
    .fetchUserPosts(userHandle)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
