const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const moment = require('moment');

const User = require('../models/users');

const router = express.Router();

const OTP =  Math.floor(100000 + Math.random() * 900000);
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "webeeteck@gmail.com",
        pass: "webeeteck@123"
    }
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if(user.length > 1) {
            return res.status(409).json({
                message: "Email alredy exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        OTP: OTP
                    });
                    
                    user.save().then(doc => {
                        const mailOptions = {
                            from: "webeeteck@gmail.com",
                            to: doc.email,
                            subject: 'OTP From Webeeteck',
                            text: `Your OTP is ${OTP}`,
                        }
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                res.status(400).json({
                                    error: "Resend OTP"
                                });
                            } else {
                                res.status(201).json({
                                    message: "User Created",
                                    userData: [
                                        {
                                            userId: doc.id,
                                            email: doc.email
                                        }
                                    ],
                                });
                            }
                        });
                        }).catch(err => {
                            if(err.code === 11000) {
                                res.status(409).json({
                                    message: "Email Already Exists"
                                });
                            } else if(err.message) {
                                res.status(400).json({
                                    error: err.message
                                });
                            } else {
                                res.status(500).json({
                                    error: err
                                }); 
                            };
                        });
                };
            });
        };
    });
});

router.post('/otp', (req, res, next) => {
    User.find({email: req.body.email, OTP: req.body.otp}).exec().then(user => {
        if(user.length > 0) {
            let userData = user[0];
            let now = moment(Date.now()).format("DD/MM/YYYY HH:mm:ss");
            let then = userData.otpTime;
            let diff = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
            if(diff < "00:03:00") {
                User.updateMany({_id: userData._id}, {$set: {confrimed: true, userStatus: 1, OTP: null, otpTime: null}}).exec().then(doc => {            
                    const token = jwt.sign(
                        {
                            email: doc.email,
                            userId: doc._id
                        },
                        "secret",
                        {
                            expiresIn: "1h"
                        }
                    )
                    res.status(200).json({
                        message: "OTP Verification Successfull",
                        userDetails: [
                            {
                                id: userData._id,
                                email: userData.email,
                                token: token
                            }
                        ]
                    });
                }).catch(err => {
                    res.status(400).json({
                        message: "OTP Verification Failed"
                    })
                });
            } else {
                res.status(401).json({
                    message: "OTP Expired"
                })
            }
        } else {
            res.status(409).json({
                message: "User Not Exists"
            })
        }
    });
});

router.post('/sendOTP', (req, res, next) => {
    User.find({ email: req.body.email}).exec().then(user => {
        if(user.length > 0) {
            const userDetails = user[0]
            const mailOptions = {
                from: "webeeteck@gmail.com",
                to: userDetails.email,
                subject: 'OTP From Webeeteck',
                text: `Your OTP is ${OTP}`,
            }            
            User.update({ _id: userDetails._id}, {$set : {OTP: OTP, otpTime: Date.now()}}).exec().then(doc => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(400).json({
                            message: "Resend OTP",
                            error: error
                        });
                    } else {
                        res.status(201).json({
                            message: "OTP Sended",
                            userData: [
                                {
                                    userId: userDetails._id,
                                    email: userDetails.email
                                }

                            ]
                        });
                    };
                });
            }).catch(err => {
                res.status(401).json({
                    message: "OTP Sending Failed",
                });
            });
        } else  {
            res.status(401).json({
                message: "User Not Found"
            })
        };
    }).catch(err => {
        res.status(401).json({
            message: "Email Dose Not Exists"
        });
    });
});

router.post('/resetPassword', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        } else {
            User.findByIdAndUpdate( {_id: req.body.id}, {$set: { password: req.body.password} }).then(user => {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
                    },
                    "secret",
                    {
                        expiresIn: "1h"
                    }
                )
                res.status(200).json({
                    message: "Password Update Successfully",
                    userData: [
                        {
                            userId: user._id,
                            email: user.email,
                            token: token
                        }
                    ]
                })
            }).catch(err => {
                res.status(401).json({
                    message: "Failed Password Updation"
                })
            })
        }
    });
})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "User Not Exits"
            });
        };
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            console.log("called", err,result)
            if(err || !result) {
                return res.status(401).json({
                    message: "Incorrect Password"
                });
            } 
            if(result) {
                if(user[0].confrimed) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        "secret", 
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: "Login Successfully",
                        user: [
                            {
                                userId: user[0]._id,
                                email: user[0].email,
                                token: token
                            }
                        ]
                    });
                } else {
                    return res.status(401).json({
                        message: "Email Not Verified"
                    })
                }
            };
        });
    });
});

router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    User.remove({ _id: userId }).exec().then(user => {
        res.status(200).json({
            message: "User Removed Successfully"
        });
    }).catch(err => {
        res.status(401).json({
            errorss: "User Not Found"
        })
    })
})

module.exports = router;