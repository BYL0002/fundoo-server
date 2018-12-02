/**
 * @description Event Emitter using for sending mail
 * @author Yash
 * @since 30/11/2018
 * @version 1.1
 */
const utility = require('../utility/util');
const usermodel = require('../app/models/UserModel');
const EventEmitter = require('events');
const eventEmitterObj = new EventEmitter();

/**
 * @description registration service
 */
eventEmitterObj.on('register', function(req, callback) {

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
})

/**
 * @description registration service
 */
eventEmitterObj.on('userVerify', function(req) {

    let token = utility.tokenGeneration(req.email);
    let requestContainToken = {
        name : req.name,
        email : req.email,
        token : token
    }

    usermodel.registerUserVerifyModel(requestContainToken, (err, data) => {

        if(err) {
            console.log('error on service emitter');
            
            // return callback(err);
        }
        else {

            let token = utility.tokenGeneration(req.email);

            let userDetails = {
                to: req.email,
                subject: 'Registration Link for Fundoo Notes',
                html: '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>'
            }
            utility.eventEmitterObj.emit('userVerify', userDetails );
            console.log('success on service emitter');
            
            // return callback(null, data);
        }

    })
})

/**
 * @description forgot password service
 */
eventEmitterObj.on('forgotPassword', function(req, callback) {

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
})

module.exports = {eventEmitterObj};