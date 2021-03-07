const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userScehema = new Schema({
    username: {type:String, required:true,unique:true,trim:true,minlength:4},
}, {
    timestamps:true
});

const User = mongoose.model('User', userScehema);
module.exports = User;