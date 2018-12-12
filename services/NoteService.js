/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const utility = require('../utility/util');
const staticFile = require('../config/static');
const usermodel = require('../app/models/UserModel');
const noteModel = require('../app/models/NoteModel');
// const async = require('async');

/**
 * @description notes save service
 */
exports.NoteService = function(req, callback) {
    
    usermodel.loginModel(req, (err, data) => {

        if(err == false) {
            return callback(false);
        }
        else {
            let userDetails = {
                to : req.email,
                subject: 'Activity Review',
                html: '<p>Account logged on Fundoo Notes !</p>'
            }
            utility.mailSender(userDetails);
            return callback(null, data);
        }
    });
}
