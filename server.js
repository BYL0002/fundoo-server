const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./route/route.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors);
app.use('/', routes);