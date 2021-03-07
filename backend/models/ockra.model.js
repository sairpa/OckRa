const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ockraScehema = new Schema({
    roomname: {type:String, required:true,unique:true},
    date:{type:Date,required:true},
    chart:{type:JSON,required:true},
}, {
    timestamps:true
});

const OckRa = mongoose.model('Chart_Model', ockraScehema);
module.exports = OckRa;