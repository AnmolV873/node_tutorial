const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');


//authentication Logic here
passport.use(new LocalStrategy(async (USERNAME, PASSWORD, done)=>{
    try{
      console.log('Received Crediantials: ', USERNAME, PASSWORD);
      const user = await Person.findOne({username: USERNAME});
      if(!user)
        return done(null, false, {message: 'Incorrect Username'});
  
      const isPasswordMatch = user.password === PASSWORD ? true : false;
      if(isPasswordMatch){
        return done(null, user);
      }else{
        return done(null, false, { message : 'Wromg Password'});
      }
  
    }catch(err){
      return done(err);
    }
}));
  
module.exports = passport;
