const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    OTP: { type: Number, required: true },
    confrimed: { type: Boolean, default: false },
    createdDate: {type: Date, default: Date.now(), required: true},
    userStatus: {type: String, default: 0},
    otpTime: { type: Date, default: Date.now(), required: true }
});

module.exports = mongoose.model('User', userSchema);
