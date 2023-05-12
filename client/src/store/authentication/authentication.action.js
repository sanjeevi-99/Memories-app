import * as api from "../../services/api/api.services";
import AUTH_ACTION_TYPES from "./authentication.types";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH_ACTION_TYPES.AUTH, payload: data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH_ACTION_TYPES.AUTH, payload: data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
