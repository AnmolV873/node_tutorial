const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const mongoose = require('mongoose');


//Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');



const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use(passport.initialize());
const locaAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/',function (req, res) {
  res.send('Hello welcome to my hotel...How may I help you')
});


//Use the routers
app.use('/person', personRoutes);
app.use('/menu',  menuRoutes);

app.listen(PORT)
