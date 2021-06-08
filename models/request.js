var mongoose = require("mongoose");
var requestSchema = new mongoose.Schema({
	tname: {
		type: String,
		default: [],
	},
	day: {
		type: String,
		default: [],
	},
	sec: {
		type: String,
		default: [],
	},
	batch: {
		type: String,
		default: [],
	},
	from: {
		type: String,
		default: [],
	},
	to: {
		type: String,
		default: [],
	},
	approved: {
		type: String,
	},
	room: {
		type: String,
		default: "",
	},
	permanent: {
		type: String,
		default: "False",
	},
});
module.exports = mongoose.model("Request", requestSchema);
