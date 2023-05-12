import AUTH_ACTION_TYPES from "./authentication.types";

export const AUTH_INITIAL_STATE = {
  auth: [],
};

export const authReducer = (state = AUTH_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.AUTH:
      localStorage.setItem('profile', JSON.stringify({...payload, token: payload.accessToken || payload.token}));
      return { ...state, auth: payload};
    case AUTH_ACTION_TYPES.LOGOUT:
      localStorage.clear();
      return { ...state, auth: null};
    default:
      return state;
  };
};
