const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

const userDetails = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userDob: { type: Date, required: true },
    userTob: { type: Float, required: true },
    userGender: { type: String, required: true },
    userHeight: { type: Float, required: true },
    userSalary: { type: Number, required: true },
    userAge: { type: Number, required: true },
    userCaste: { type: Number, required: true }
});

module.exports = mongoose.model("Details", userDetails);