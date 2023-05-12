import { combineReducers } from "redux";

import { postReducer } from './post/post.reducer';
import { authReducer } from "./authentication/authentication.reducer";

export const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer
});