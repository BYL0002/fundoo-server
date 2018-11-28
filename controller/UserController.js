/**
 * @description Controller so as to operate on request from client side & generate response from server side
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */

const userservices = require('../services/UserServices');

exports.loginController = function (req, res, next) {
    console.log('login controller');
    
    
    try {
        userservices.loginService(req.body, (err, data) => {

            if (err) {
                res.status(400).send(err);
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

/**
 * @description Controller for register & sending response to client
 */
exports.registerController = function (req, res, next) {

    let request = {
        token : req.body.token,
        password : req.body.password1
    }
    console.log(typeof request);
    console.log(request);    
    
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
    console.log(typeof request);
    console.log(request);
    
    try {
        userservices.registerUserVerifyService(request, (err, data) => {

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

    console.log(typeof request);
    console.log(request);
    
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