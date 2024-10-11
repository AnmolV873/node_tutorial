const express = require('express');
const app = express();
const db = require('./db');
//Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello welcome to my hotel...How may I help you')
})


//Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000)
