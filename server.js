/* eslint-disable no-console */
import dotenv from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose';

dotenv.config();

//Database
const DB = process.env.DATABASE_URI;
mongoose
    .connect(DB, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to Database Successfully!');
    })
    .catch((err) => {
        console.log(err);
    });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`
    );
});
