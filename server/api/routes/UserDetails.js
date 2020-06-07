const express = require("express");
const mongoose = require("mongoose");

const userDetails = require('../models/UserDetails');

const router = express.Router();

router.post('/add-profile', (req, res, next) => {
    res.status(201).json({
        message: "Success"
    });
});

module.exports = router;