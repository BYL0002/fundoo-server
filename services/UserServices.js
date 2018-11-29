/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const usermodel = require('../app/models/UserModel');
const async = require('async');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'labzbridge02@gmail.com',
           pass: 'bridge01!'
       }
   });

let payload = {
    data : 'data01'
}
let privateKey = "privateKey";

var i = 'bridgelabz';          // Issuer 
var s = 'login - some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
issuer: i,
subject: s,
audience: a,
expiresIn: "1h"
};

let token = jwt.sign(payload, privateKey, signOptions);
// console.log('token - ',token);


/**
 * @description login service
 */
exports.loginService = function(req, callback) {
    
    usermodel.loginModel(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {
            // console.log('data retuned from model to service : ', data);
            
            let mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: data.email_id, // list of receivers
                subject: 'Activity Review', // Subject line
                html: '<p>Login Successful on Fundoo Notes!</p>'// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Login Email not sent');
                    // console.log(err)
                }
                else {
                    console.log('Login Email Sent');
                    // console.log(info);
                }                    
            });
            return callback(null, data);
        }
    });
}

/**
 * @description registration service
 */
exports.registerService = function(req, callback) {

    usermodel.findAndSaveTokenModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            let mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: data.email_id, // list of receivers
                subject: 'Registration Successful on Fundoo Notes', // Subject line
                html: '<p>Your are most Welcome to Fundoo Notes anytime. Thank You!</p>'// plain text body
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Register Email not sent');
                    // console.log(err)
                }
                else {
                    console.log('Register Email Sent');
                    // console.log(info);
                }                    
            });
            return callback(null, data);
        }
    })    
}

/**
 * @description registration service
 */
exports.registerUserVerifyService = function(req, callback) {

    console.log('request on service page');
    console.log(req);

    let requestContainToken = {
        name : req.name,
        email : req.email,
        token : token
    }

    usermodel.registerUserVerifyModel(requestContainToken, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {

            let mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: req.email, // list of receivers
                subject: 'Registration Link for Fundoo Notes', // Subject line
                html: '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>' // plain text body
                // html: '<p>Click <a href="http://localhost:3000/sessions/recover/' + recovery_token + '">here</a> to reset your password</p>'

            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Register Email not sent');
                    console.log(err)
                }
                else {
                    console.log('Register Email Sent');
                    console.log(info);
                }                    
            });

            return callback(null, data);
        }

    })
}

/**
 * @description forgot password service
 */
exports.forgotPasswordService = function(req, callback) {

    console.log('request on service page');
    console.log(req);

    let requestContainToken = {
        email : req.email,
        token : token
    }

    usermodel.forgotPasswordModel(requestContainToken, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {

            let mailOptions = {
                from: 'labzbridge02@gmail.com', // sender address
                to: req.email, // list of receivers
                subject: 'Reset Password Link for Fundoo Notes', // Subject line
                html: '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>' // plain text body
                // html: '<p>Click <a href="http://localhost:3000/sessions/recover/' + recovery_token + '">here</a> to reset your password</p>'

            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err) {
                    console.log('Register Email not sent');
                    console.log(err)
                }
                else {
                    console.log('Register Email Sent');
                    console.log(info);
                }                    
            });

            return callback(null, data);
        }

    })
}

/**
 * @description registration service
 */
exports.logoutService = function(req, callback) {

    usermodel.logoutModel(req, (err, data) => {

        if(err) return callback(err);
        else return callback(null, data);

    })
}