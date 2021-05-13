const mongoose = require("mongoose");
var teacherTimetableSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: 1,
		},
		day: {
			monday: {
				timetable: [],
				section: [],
				roomno: [],
			},
			tuesday: {
				timetable: [],
				section: [],
				roomno: [],
			},
			wednesday: {
				timetable: [],
				section: [],
				roomno: [],
			},
			thursday: {
				timetable: [],
				section: [],
				roomno: [],
			},
			friday: {
				timetable: [],
				section: [],
				roomno: [],
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("TeacherTimetable", teacherTimetableSchema);
