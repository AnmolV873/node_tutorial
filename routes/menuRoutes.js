const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');


// Router POST method for menu
router.post('/', async(req, res)=>{
    try{
      const item = req.body;
  
      const newMenu = new Menu(item);
  
      const response = await newMenu.save();
      console.log('Item added');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'})   
    }
  })
  
// Router GET method to get the menu Items
router.get('/', async(req, res)=>{
    try{
      const item = await Menu.find()
      console.log('data fetched');
      res.status(200).json(item);
    }catch(err){
      console.log('err');
      res.status(500).json({error: 'Internal Server Error'});
    }
  })


router.get('/:tasteType', async(req, res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
            const response = await Menu.find({taste: tasteType});
            console.log('Menu fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid taste Type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
        
    }
})

module.exports = router; 
  