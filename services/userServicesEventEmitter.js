/**
 * @description Event Emitter using for sending mail
 * @author Yash
 * @since 30/11/2018
 * @version 1.1
 */
const utility = require('../utility/util');
const usermodel = require('../app/models/UserModel')
/**
 * @description login service
 */
exports.loginServiceEmitter = function(req, callback) {
    
    usermodel.loginModel(req, (err, data) => {

        if(err) {
            return callback(err);
        }
        else {
            let userDetails = {
                to : data.email_id,
                subject: 'Activity Review',
                html: '<p>Account logged on Fundoo Notes !</p>'
            }
            utility.eventEmitter.emit("login", userDetails);
            return callback(null, data);
        }
    });
}

/**
 * @description registration service
 */
exports.registerServiceEmitter = function(req, callback) {

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
            utility.eventEmitter.emit("register", userDetails);
            return callback(null, data);
        }
    })    
}

/**
 * @description registration service
 */
exports.registerUserVerifyServiceEmitter = function(req, callback) {

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
                html: '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>'
            }
            utility.eventEmitter.emit('userVerify', userDetails );
            return callback(null, data);
        }

    })
}

/**
 * @description forgot password service
 */
exports.forgotPasswordServiceEmitter = function(req, callback) {

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
                html : '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>'
            }
            utility.eventEmitter.emit('forgotPassword', userDetails );
            return callback(null, data);
        }

    })
}

/**
 * @description registration service
 */
exports.logoutServiceEmitter = function(req, callback) {

    usermodel.logoutModel(req, (err, data) => {

        if(err) return callback(err);
        else return callback(null, data);

    })
}
