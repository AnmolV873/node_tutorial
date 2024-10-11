const mongoose = require('mongoose');

//Define Person Schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['Chef', 'waiter', 'Manager'],
        require: true
    },
    mobile:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        require: true
    }
});

//Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
