/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */
const collabmodel = require('../app/models/CollabModel');
const usermodel = require('../app/models/UserModel');
const noteModel = require('../app/models/NoteModel');
const async = require('async');

/**
 * @description collab save service
 */
exports.collabAddService = function (req, callback) {
    console.log('req on service', req);

    collabmodel.collabSaveModel(req, (err, data) => {

        if (err) {
            return callback(err);
        }
        else {
            return callback(null, result);
        }
    })
}

/**
 * @description Collab User Delete Service
 */
exports.collabDeletionService = function (req, callback) {
    console.log("req on service on note display", req);

    collabmodel.labelDeletionModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

// collab

// exports.getCollabNotesUserId = (req, callback) => {

//     collabmodel.getCollabNotesUserId(req, (err, result) => {
//         if(err) {
//             callback(err);
//         } else {
//             callback(null, result);
//         }
//     })
// }


// exports.getCollabDetails = (callback) => {
//     console.log("30");

//     usermodel.FindAllModel( (err, result) => {
//         if(err) {
//             callback(err);
//         } else {
//             callback(null, result);
//         }
//     })
// }