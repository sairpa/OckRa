const mongoose = require('mongoose');
const Schema =mongoose.Schema
const feedbackschema= new Schema({

    username: { type: String, required: true },
    email:{type: email,required:true},
    comments:{type: String,required:true}
})

const feedbacks = mongoose.model('feedbacks', feedbackschema);
module.exports=feedbacks;