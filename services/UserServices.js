/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const usermodel = require('../app/models/UserModel');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'labzbridge02@gmail.com',
           pass: 'bridge01!'
       }
   });

/**
 * @description login service
 */
exports.loginService = function(req, callback) {
    
    usermodel.loginModel(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {
            // const mailOptions = {
            //     from: 'labzbridge02@gmail.com', // sender address
            //     to: req.email, // list of receivers
            //     subject: 'Registration Successful on ChatApp', // Subject line
            //     html: '<p>Your are most Welcome to chat on ChatApp anytime. Thank You!</p>'// plain text body
            // };

            return callback(null, data);
        }
    });
}

/**
 * @description registration service
 */
exports.registerService = function(req, callback) {

    console.log('request on service page');
    console.log(req);
    usermodel.registerModel(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {

            // const mailOptions = {
            //     from: 'labzbridge02@gmail.com', // sender address
            //     to: req.email, // list of receivers
            //     subject: 'Registration Successful on ChatApp', // Subject line
            //     html: '<p>Your are most Welcome to chat on ChatApp anytime. Thank You!</p>'// plain text body
            // };

            // transporter.sendMail(mailOptions, function (err, info) {
            //     if(err) {
            //         console.log('Register Email not sent');
            //         console.log(err)
            //     }
            //     else {
            //         console.log('Register Email Sent');
            //         console.log(info);
            //     }                    
            // });

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