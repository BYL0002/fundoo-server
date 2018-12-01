/**
 * @description Controller so as to operate on request from client side & generate response from server side
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */

const userservices = require('../services/UserServices');
const utility = require('../utility/util');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

exports.loginController = function (req, res, next) {
        
    try {
        userservices.loginService(req.body, (err, data) => {

            if (err) {
                res.status(400).send({
                    status : false,
                    message : err,
                });
            }
            else {                
                let token = utility.tokenGeneration(data.email_id);
                res.status(200).send({
                    status : true,
                    message : data,
                    token : token
                });
            }
        })
    }
    catch (err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.registerController = function (req, res, next) {

    let request = {
        token : req.body.token,
        password : req.body.password1
    }
    console.log(typeof request);
    // console.log('controller register',request);    
    
    try {
        userservices.registerService(request, (err, data) => {

            if (err) {
                res.status(400).send(err);
                // res.status(404).json({
                //     success : true,
                //     message: err
                // });
            }
            else {
                res.status(200).send(data);
                // return res.status(404).json({
                //     success : true,
                //     message: data
                //   });
            }
        })
    }
    catch(err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.registerUserVerifyController = function (req, res, next) {

    let request = {
        email : req.body.email,
        name : req.body.name
    }
    // console.log(typeof request);
    // console.log(request);
    
    try {
        userservices.registerUserVerifyServiceEmitter(request, (err, data) => {

            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send(data);
            }
        })
    }
    catch(err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.forgotPasswordController = function (req, res, next) {

    // console.log(typeof req);
    // console.log(req.body);
    
    try {
        userservices.forgotPasswordService(req.body, (err, data) => {

            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send(data);
            }
        })
    }
    catch(err) {
        next(err);
    }
}

/**
 * @description Logout controller function to get the output and pass the input to services where business logic exist
 */
exports.logoutController = function (req, res, next) {
    try {
        userservices.logoutService(req.body, (err, data) => {

            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send(data);
            }
        })
    }
    catch (err) {
        next(err);
    }
}

//---------------------------------------------------Event Emitter Operations----------------------------------------------------------

// eventEmitter.on('list', function(msg) {
//     console.log(msg);
//     console.log('list event called --------------------------');
// })

// eventEmitter.addListener('FirstEvent', function (data) {
//     console.log('First subscriber ----- : ' + data);
// });

// eventEmitter.on('FirstEvent', function (data) {
//     console.log('First subscriber: ' + data);
// });

// eventEmitter.emit('FirstEvent', 'Test event emitter');
// eventEmitter.emit('list', 'messages----');
// eventEmitter.emit('list', 'messages----');

// eventEmitter.on('x', function(data) {
//     console.log(data);    
// });

// exports.emitter = eventEmitter;


/**
 * @description Controller for register & sending response to client
 */
exports.registerEventEmitterController = function (req, res, next) {

    let request = {
        token : req.body.token,
        password : req.body.password1
    }
    console.log(typeof request);
    // console.log('controller register',request);    
    
    try {
        userservices.registerService(request, (err, data) => {

            if (err) {
                res.status(400).send(err);
                // res.status(404).json({
                //     success : true,
                //     message: err
                // });
            }
            else {
                res.status(200).send(data);
                // return res.status(404).json({
                //     success : true,
                //     message: data
                //   });
            }
        })
    }
    catch(err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.registerUserVerifyEventEmitterController = function (req, res, next) {

    let request = {
        email : req.body.email,
        name : req.body.name
    }
    // console.log(typeof request);
    // console.log(request);
    
    try {
        userservices.registerUserVerifyServiceEmitter(request, (err, data) => {

            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send(data);
            }
        })
    }
    catch(err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.forgotPasswordEventEmitterController = function (req, res, next) {

    // console.log(typeof req);
    // console.log(req.body);
    
    try {
        userservices.forgotPasswordService(req.body, (err, data) => {

            if (err) {
                res.status(400).send(err)
            }
            else {
                res.status(200).send(data);
            }
        })
    }
    catch(err) {
        next(err);
    }
}