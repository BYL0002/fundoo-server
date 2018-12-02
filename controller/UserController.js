/**
 * @description Controller so as to operate on request from client side & generate response from server side
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */

const userServices = require('../services/UserServices');
const userServicesEmiteer = require('../services/userServicesEventEmitter');
const utility = require('../utility/util');

exports.loginController = function (req, res, next) {

    try {
        userServices.loginService(req.body.data, (err, data) => {

            if (err) {
                res.status(400).send({
                    status: false,
                    message: err,
                });
            }
            else {
                let token = utility.tokenGeneration(data.email_id);
                res.status(200).send({
                    status: true,
                    message: data,
                    token: token
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
        token: req.body.data.token,
        password: req.body.data.password1
    }
    console.log(typeof request);
    console.log('controller register', request);

    try {
        userServices.registerService(request, (err, data) => {

            if (err) {
                res.status(400).send({
                    status: false,
                    message: err
                })
            }
            else {
                res.status(200).send({
                    status: true,
                    message: data
                })
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
exports.registerUserVerifyController = function (req, res, next) {

    let request = {
        email: req.body.data.email,
        name: req.body.data.name
    }
    // console.log(typeof request);
    // console.log(request);

    try {
        userServicesEmiteer.registerUserVerifyServiceEmitter(request, (err, data) => {

            if (err) {
                res.status(400).send({
                    status: false,
                    message: err
                })
            }
            else {
                res.status(200).send({
                    status: true,
                    message: data
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
exports.forgotPasswordController = function (req, res, next) {

    // console.log(typeof req);
    // console.log(req.body);

    try {
        userServices.forgotPasswordService(req.body.data, (err, data) => {

            if (err) {
                res.status(400).send({
                    status: false,
                    message: err
                })
            }
            else {
                res.status(200).send({
                    status: true,
                    message: data
                });
            }
        })
    }
    catch (err) {
        next(err);
    }
}

/**
 * @description Logout controller function to get the output and pass the input to services where business logic exist
 */
exports.logoutController = function (req, res, next) {
    try {
        userServices.logoutService(req.body.data, (err, data) => {

            if (err) {
                res.status(400).send({
                    status: false,
                    message: err
                })
            }
            else {
                res.status(200).send({
                    status: true,
                    message: data
                });
            }
        })
    }
    catch (err) {
        next(err);
    }
}

//---------------------------------------------------Event Emitter Operations----------------------------------------------------------

/**
 * @description Controller for register & sending response to client
 */
exports.registerEventEmitterController = function (req, res, next) {

    let request = {
        token: req.body.data.token,
        password: req.body.data.password1
    }
    console.log(typeof request);
    // console.log('controller register',request);    

    try {
        userServicesEmiteer.eventEmitterObj.emit('register', request, (err, data) => {

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
    catch (err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.registerUserVerifyEventEmitterController = function (req, res, next) {

    console.log('req client');
    // console.log(req);

    let request = {
        email: req.body.data.email,
        name: req.body.data.name
    }
    console.log(typeof request);
    console.log(request);

    try {
        let promise = new Promise((resolve, reject) => {
            let resultOfEmitter = userServicesEmiteer.eventEmitterObj.emit('userVerify', request)
            if (resultOfEmitter) {
                resolve(resultOfEmitter);
            }
            else {
                reject(resultOfEmitter);
            }
        })

        promise.then((result) => {
            if (result) {
                console.log('controller promise success');
                
                res.status(200).send({
                    status: true
                })
            }
            else {
                console.log('controller promise success failed');
                
                res.status(400).send({
                    status: false
                })
            }
        }).catch(err => {
            console.log('error on promise event emitter');
        })
    }
    catch (err) {
        next(err);
    }
}

/**
 * @description Controller for register & sending response to client
 */
exports.forgotPasswordEventEmitterController = function (req, res, next) {

    // console.log(typeof req);
    console.log(req.body);

    try {
        userServicesEmiteer.eventEmitterObj.emit('forgotPassword', req.body.data, (err, data) => {

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
