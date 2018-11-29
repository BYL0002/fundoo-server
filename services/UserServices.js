/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */
const utility = require('../utility/util');
const usermodel = require('../app/models/UserModel');
// const async = require('async');

/**
 * @description login service
 */
exports.loginService = function(req, callback) {
    
    usermodel.loginModel(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {
            
            utility.mailSender(data.email_id, "login");
            return callback(null, data);
        }
    });
}

/**
 * @description registration service
 */
exports.registerService = function(req, callback) {

    console.log('req on service', req);
    
    usermodel.findAndSaveTokenModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            utility.mailSender(data.email_id, "register");
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
            utility.mailSender(req.email, "verifyUser");
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
            utility.mailSender(req.email, "");
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