const mongoose=require("mongoose");
var studentTimetableSchema = new mongoose.Schema({
    sec:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    monday:{
        type:Array,
        default:[]
    },
    tuesday:{
        type:Array,
        default:[]
    },
    wednesday:{
        type:Array,
        default:[]
    },
    thursday:{
        type:Array,
        default:[]
    },
    friday:{
        type:Array,
        default:[]
    }
    
    
});

module.exports = mongoose.model("StudentTimetable", studentTimetableSchema);