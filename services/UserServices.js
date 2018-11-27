/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const usermodel = require('../app/models/UserModel');

/**
 * @description registration service
 */
exports.registerService = (req, callback) => {
    usermodel.registerModel(req, (err, data) => {
        if(err) {
            return callback(err);
        }
        else {
            return callbacknull(null, data);
        }
    })
}