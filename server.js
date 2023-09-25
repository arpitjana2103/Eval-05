const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const {authRouter} = require('./Routes/authRoute');
const {empRouter} = require('./Routes/empRoute');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;
const DBL = process.env.DATABASE_LOCAL;
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/api/', function (req, res) {
    return res.status(200).json({
        status: 'Success',
        message: 'Welcome',
    });
});

app.use('/api/auth/', authRouter);
app.use('/api/employee/', empRouter);

const server = app.listen(PORT, function () {
    console.log('Connecting to DB...');
});

mongoose
    .connect(DBL)
    .then(function () {
        console.log('DB Connection Successfull.');
        console.log(`URL : http://127.0.0.1:${PORT}/api/`);
    })
    .catch(function (error) {
        console.log('DB Connection ERROR');
        console.log('Shutting Down the SERVER');
        // console.log(error)

        server.close(function () {
            process.exit(1);
        });
    });
