var mongoose =require("mongoose");
var tokenSchema =mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    expireAt:{
        type: Date,
        default: Date.now,
        index: {
            expires: 1800 
        } 
    }
});
module.exports=mongoose.model("Token",tokenSchema);