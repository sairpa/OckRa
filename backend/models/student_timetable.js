const mongoose = require("mongoose");
var studentTimetableSchema = new mongoose.Schema(
	{
		sec: {
			type: String,
			required: true,
		},

		batch: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: 0,
		},
		day: {
			monday: {
				timetable: [],
				teacher: [],
				roomno: [],
				default: [],
			},
			tuesday: {
				timetable: [],
				teacher: [],
				roomno: [],
				default: [],
			},
			wednesday: {
				timetable: [],
				teacher: [],
				roomno: [],
				default: [],
			},
			thursday: {
				timetable: [],
				teacher: [],
				roomno: [],
				default: [],
			},
			friday: {
				timetable: [],
				teacher: [],
				roomno: [],
				default: [],
			},
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("StudentTimetable", studentTimetableSchema);
