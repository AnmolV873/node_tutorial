const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    taste:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        require: true
    },
    is_drink:{
        type:Boolean,
        default: false
    },
    ingrediant:{
        type:[String],
        default: []
    },
    num_sales:{
        type: Number,
        default: 0
    }

})

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
