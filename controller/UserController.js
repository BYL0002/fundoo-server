/**
 * @description Controller so as to operate on request from client side & generate response from server side
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */

const userservices = require('../services/UserServices');

exports.loginController = function (req, res, next) {
    try {
        userservices.login_service_function(req.body, (err, data) => {

            if (err) {
                res.status(400).send(err);
            }
            else {

                var token = jwt.sign(payload, privateKEY, signOptions);
                console.log("Token - " + token);

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
    console.log('controller before service ', req.body);
    
    try {
        userservices.register_service_function(req.body, (err, data) => {

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

exports.logoutController = function (req, res, next) {
    try {
        userservices.logout_service_function(req, (err, data) => {

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