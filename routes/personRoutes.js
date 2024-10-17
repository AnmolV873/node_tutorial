const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

//POST route method for person
router.post('/signup', async(req, res)=>{
    try{
      const data = req.body

      //Create a new Person document using the Mongoose model
      const newPerson = new Person(data);
      
      // Save the new person to the database
      const response = await newPerson.save();
      console.log('Data saved');

      const token = generateToken(response.username);
      console.log('token is : ', token);
      
      res.status(200).json({response: response, token: token});
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'})
    }
  })

//Login Route
router.post('/login', async(req, res)=>{
  try{
    //Extraqct username and password from request body
    const {username, password} = req.body;

    //Find the user by username
    const user = await Person.findOne({username: username});

    //If user does not exist or password not matches, return err
    if( !user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or passsord'});
    }

    //generate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token  = generateToken(payload);

    //return token as response
    res.json(token);
  }catch(err){
    console.log(err);
    req.status(500).json({error: 'Internal Server error'});
  }
})
  
  //GET method for person
router.get('/',jwtAuthMiddleware, async(req, res)=>{
    try{
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
      
    }
})

router.get('/:workType' , async(req, res)=>{
    try{
      const workType = req.params.workType; // Extract the workType from thye URL parameters
      if(workType == 'Chef' || workType == 'Manager' || workType == 'waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }else{
        res.status(404).json({error: 'Invalid work Type'});
      }
  
    }catch(err){
      console.log('err');
      res.status(500).json({error: 'internal Server Error'});
    }
})


//Update the person record
router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({error: 'Person Id not found'});
        }
        console.log('data Updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


//DELETE  the record
router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'person id Not found'});
        }
        console.log('data deleted');
        res.status(200).json({message: 'Person deleted succesfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;
