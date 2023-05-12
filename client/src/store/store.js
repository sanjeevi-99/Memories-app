import { createStore, applyMiddleware, compose } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));