/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const utility = require('../utility/util');
const staticFile = require('../config/static');
const usermodel = require('../app/models/UserModel');
// const async = require('async');

/**
 * @description login service
 */
exports.loginService = function(req, callback) {
    
    usermodel.loginModel(req, (err, data) => {

        if(err == false) {
            return callback(false);
        }
        else {
            let userDetails = {
                to : req.email,
                subject: 'Activity Review',
                html: '<p>Account logged on Fundoo Notes !</p>'
            }
            utility.mailSender(userDetails);
            return callback(null, data);
        }
    });
}

/**
 * @description registration service
 */
exports.registerService = function(req, callback) {

    // console.log('req on service', req);
    
    usermodel.findAndSaveTokenModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            let userDetails = {
                to: data.email_id,
                subject: 'Registration Successful on Fundoo Notes',
                html: '<p>Your are most Welcome to Fundoo Notes anytime. Thank You!</p>'
            }
            utility.mailSender(userDetails);
            return callback(null, data);
        }
    })    
}

/**
 * @description registration service
 */
exports.registerUserVerifyService = function(req, callback) {

    let token = utility.tokenGeneration(req.email);
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
            let token = utility.tokenGeneration(req.email);

            let userDetails = {
                to: req.email,
                subject: 'Registration Link for Fundoo Notes',
                html: '<p>Click <a href = "'+ staticFile.url_setpassword + token+ '">here</a> to activate account.</p>'
            }
            utility.mailSender(userDetails);
            return callback(null, data);
        }

    })
}

/**
 * @description forgot password service
 */
exports.forgotPasswordService = function(req, callback) {

    let token = utility.tokenGeneration(req.email);

    let requestContainToken = {
        email : req.email,
        token : token
    }

    usermodel.forgotPasswordModel(requestContainToken, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {
            let token = utility.tokenGeneration(req.email);
            let userDetails = {
                to : req.email,
                subject : 'Reset Password Link for Fundoo Notes',
                html : '<p>Click <a href = "'+ staticFile.url_setpassword + token+ '">here</a> to set new password.</p>'
            }

            utility.mailSender(userDetails);

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

//-----------------------------------------------------------------------Event Emitter

// console.log(utility.eventEmitter.emit('sendEmail', {'data':1}));


// class eventNotes extend EventEmitter{

// } 