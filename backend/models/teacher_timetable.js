const mongoose=require("mongoose");
var teacherTimetableSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    timetable:{
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
}
    
});

module.exports = mongoose.model("TeacherTimetable", teacherTimetableSchema);