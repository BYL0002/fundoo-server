/**
 * @description Server Side (complete node js structure & database schema based connection)
 * @author Yash
 * @version 3.11
 * @module Server
 * @since 26/11/2018
 */

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./route/route.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = require('./config/dbconfig');
console.log('url', dbUrl);

// const MongoClient = require('mongodb').MongoClient;

/**
 * @description Parsing the request get by client
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);
app.use('/', routes);

server = app.listen(3001, () => {
    startMongoDb(dbUrl);
    console.log('server is up and running');
  });

/**
 * @description cheking database connectivity
 * @param {String} dbUrl 
 */
function startMongoDb(dbUrl) {
    mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true });
    mongoose.connection.on('error', (error) => { console.log('Connection error with MongoDb'); });
    mongoose.connection.on('open', () => { console.log('Successfully Connected to MongoDb on port  :' + db_url); });
}

app.use(function (err, req, res, next) {
    // console.error(err.stack)
    console.log(err);  
    res.status(500).send('Something broke ! Internal Server Error')
});