var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      
    },
    rollno:{
      type: String,
      required:true
    },
    
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    mobileno:{
      type: String,
      required: true
    },
    studentinfo: {
      type: Array,
      default:[]
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    sec: {
      type: String,
      required:true
    },
    batch:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

studentSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

studentSchema.methods = {
  autheticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  updatepassword: function(password){
    this.encry_password = this.securePassword(password);
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("Student", studentSchema);
