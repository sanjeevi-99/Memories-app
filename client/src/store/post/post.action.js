import * as api from "../../services/api/api.services";
import POST_ACTION_TYPES from "./post.types";

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACTION_TYPES.START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: POST_ACTION_TYPES.SET_POST_ITEMS, payload: data });
    dispatch({ type: POST_ACTION_TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACTION_TYPES.START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: POST_ACTION_TYPES.SET_POST_ITEM, payload: data });
    dispatch({ type: POST_ACTION_TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACTION_TYPES.START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({
      type: POST_ACTION_TYPES.SET_POST_ITEMS_BY_SEARCH,
      payload: data,
    });
    dispatch({ type: POST_ACTION_TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACTION_TYPES.START_LOADING });
    const { data } = await api.createPost(post);

    history.push(`/posts/${data._id}`);
    window.location.reload();

    dispatch({ type: POST_ACTION_TYPES.SET_NEW_POST, payload: data });
    dispatch({ type: POST_ACTION_TYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: POST_ACTION_TYPES.SET_UPDATED_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: POST_ACTION_TYPES.SET_DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: POST_ACTION_TYPES.SET_UPDATED_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: POST_ACTION_TYPES.SET_POST_COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
