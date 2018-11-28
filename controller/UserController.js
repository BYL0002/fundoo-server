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
        email : req.body.email,
        password : req.body.password1
    }
    console.log(typeof request);
    
    try {
        userservices.registerService(request, (err, data) => {

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