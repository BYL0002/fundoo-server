/**
 * @description Controller so as to operate on request from client side & generate response from server side
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */

const userservices = require('../services/UserServices');

/**
 * @description Register Controller for request to register & response on succesful done
 */
exports.registerController = (req, res, next) => {
    console.log(typeof req);
    try {
        userservices.registerService(req.body, (err, data) => {
            if(err)
            {
                res.status(404).send(err);
            }
            else
            {
                res.status(200).send(data);
            }
        })
    }
    catch(err) {
        next(err);
    }
}