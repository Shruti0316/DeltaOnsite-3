const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    code: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true   
    }
});

module.exports = mongoose.model('Stock', stockSchema);