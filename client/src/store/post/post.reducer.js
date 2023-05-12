import POST_ACTION_TYPES from "./post.types";

export const POST_INITIAL_STATE = {
  posts: [],
  post: [],
  isLoading: true,
};

export const postReducer = (state = POST_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case POST_ACTION_TYPES.SET_UPDATED_POST:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === payload._id ? payload : post)),
      };
    case POST_ACTION_TYPES.SET_POST_ITEMS:
      return {
        ...state,
        posts: payload.data,
        currentPage: payload.currentPage,
        numberOfPages: payload.numberOfPages,
      };
    case POST_ACTION_TYPES.SET_POST_ITEM:
      return {
        ...state,
        post: payload,
      }
    case POST_ACTION_TYPES.SET_POST_ITEMS_BY_SEARCH:
      return {
        ...state,
        posts: payload,
      };
    case POST_ACTION_TYPES.SET_NEW_POST:
      return { ...state, posts: [...state.posts, payload] };
    case POST_ACTION_TYPES.SET_DELETE_POST:
      return { ...state, posts: state.posts.filter((post) => post._id !== payload) };
    case POST_ACTION_TYPES.SET_POST_COMMENT:
      return { 
        ...state, 
        posts: state.posts.map((post) => {
          if(post._id === payload._id) {
            return payload;
          }

          return post;
        })
      };
    case POST_ACTION_TYPES.START_LOADING:
      return { ...state, isLoading: true };
    case POST_ACTION_TYPES.END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
