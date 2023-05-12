import express from 'express'

import postsRouter from './posts/posts.route.js';
import usersRouter from './users/users.route.js';

const api = express.Router();

api.use('/posts', postsRouter);
api.use('/user', usersRouter);

export default api;