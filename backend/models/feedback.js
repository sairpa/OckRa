var mongoose = require("mongoose");
var feedbackSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    user_feedback:{
        type:Array,
        default:[]
    }
});
module.exports=mongoose.model("Feedback", feedbackSchema);