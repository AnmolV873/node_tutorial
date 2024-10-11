const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//POST route method for person
router.post('/', async(req, res)=>{
    try{
      const data = req.body
  
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log('Data saved');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'})
    }
  })
  
  //GET method for person
router.get('/', async(req, res)=>{
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
