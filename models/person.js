const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});


personSchema.pre('save', async function (next){
    const person = this;
 
    //Hash password only if it has been modified or it's new
    if(!person.isModified('password')) return next();
    try{
        //hash password generation or generating a salt
        const salt = await bcrypt.genSalt(10);

        //hash password with salt
        const hashpassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed one
        person.password = hashpassword;
        next();
    }catch(err){
        return next(err);
    }
})


personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch
    }catch(err){
        throw err; 
    }   
}


//Create Person Model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
