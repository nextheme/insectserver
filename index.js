import express from 'express'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors'
import MongoConnect from './database.js';
import MediaUpload from './controllers/upload.controller.js'
import { myUploadMiddleware } from './middlewares/multerUploads.js';

import {
    ProductsRoute, PhotosRoute, CategoriesRoute
} from './routes/index.js'

dotenv.config()

const app = express();



app.use(cors())



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/products', ProductsRoute);
app.use('/api/photos', PhotosRoute);
app.use('/api/categories', CategoriesRoute);

app.post('/api/media/upload',myUploadMiddleware,MediaUpload);


const startServer = async () => {
    try {
        // connect to the database
        MongoConnect(process.env.MONGODB_URL);
        app.listen('8081', () => console.log('server started on port 8081'))
    } catch (error) {
        console.log(error)
    }
}
startServer();