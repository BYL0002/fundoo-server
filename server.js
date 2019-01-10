/**
 * @description Server Side (complete node js structure & database schema based connection)
 * @author Yash
 * @version 3.11
 * @module Server
 * @since 26/11/2018
 */

const express = require('express');
var swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const cors = require('cors');
var cache = require('express-redis-cache')();
const routes = require('./route/route.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = require('./config/dbconfig');
require('dotenv').config();


app.use(express.static('public'));

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./route/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/**
 * @description Parsing the request get by client
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/**
 * @description for routing
 */
app.use('/', routes);

cache.on('connected', () => {
    console.log('cache connected');
})

cache.on('error', () => {
    console.log('cache error');
})

cache.on('disconnected', () => {
    console.log('cache disconnected');
})

/**
 * @description cheking database connectivity
 * @param {String} dbUrl 
 */
function startMongoDb(dbUrl) {
    mongoose.set({ useCreateIndex: true })
    mongoose.connect(dbUrl, { useNewUrlParser: true });
    mongoose.connection.on('error', (error) => { console.log('Connection error with MongoDb'); });
    mongoose.connection.on('open', () => { console.log('Successfully Connected to MongoDb on port : ' + dbUrl); });
}

/**
 * @description Error Handling
 */
app.use(function (err, req, res, next) {
    // console.error(err.stack)
    console.log('err');
    console.log(err);
    res.status(500).send(err)
});

/**
 * @description Server Listening
 */
app.listen(8000, () => {
    startMongoDb(dbUrl);
    console.log('server is up and running on :', 8000);
});
// app.get('/get',(req, res)=>{
//     res.send("Hello")
// })