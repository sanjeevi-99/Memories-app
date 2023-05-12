import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dontenv from 'dotenv';

import api from './routes/api.js';

const app = express();
dontenv.config({
    path: path.resolve('../.env')
});

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/', api);

mongoose.connect(MONGODB_URL, { 
        useNewUrlParser: true, 
        // useUnifiedTology: true // Error: option useunifiedtology is not supported
    })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}\nMongoDB is connected`)))
    .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false);