const mongoose = require('mongoose');

//define the MongoDB connection URL
const MongoURL = 'mongodb://localhost:27017/mydatabase'

//Set Up MongoDB connection

// mongoose.connect(MongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,

// });
mongoose.connect("mongodb://localhost:27017/mydatabase", {

});

const db = mongoose.connection;

//Define eventlistener for database connection

db.on('connected', () =>{
    console.log('Connected to MongoDB server'); 
})

db.on('error', (err) =>{
    console.log('MongoDB connection error:' , err);
})

db.on('disconnect', ()=>{
    console.log('MongoDB disconnected');
})

module.export = db
