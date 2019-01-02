/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const usermodel = require('../app/models/UserModel');
const noteModel = require('../app/models/NoteModel');
const async = require('async');

/**
 * @description notes save service
 */
exports.NoteAddService = function (req, callback) {
    // console.log('req on service', req);

    let sender = req.sender;
    async.waterfall([

        function (callback) {

            usermodel.FindOneModel(sender, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, data._id);
                }
            })
        },
    ],

        function (err, result) {

            if (err) {
                return callback(err);
            }
            else {
                req.userId = result;

                noteModel.noteSaveModel(req, (err, data) => {
                    if (err) {
                        return callback(err);
                    }
                    else {
                        
                        return callback(null, data);
                    }
                })
            }

        }
    )
}

/**
 * @description Note Display Service
 */
exports.NoteDisplayService = function (req, callback) {

    noteModel.noteDisplayModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })
}

/**
 * @description Note Generic Update Service
 */
exports.noteUpdateService = function (req, callback) {

    noteModel.noteUpdateEverythingModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

/**
 * @description Note Color Update Service
 */
exports.noteUpdateColorService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

/**
 * @description Note Reminder Update Service
 */
exports.noteUpdateReminderService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

/**
 * @description Note Pin Update Service
 */
exports.noteUpdatePinService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

/**
 * @description Note Trash Update Service
 */
exports.noteUpdateTrashService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

/**
 * @description Note Trash Update Service
 */
exports.noteDeletionService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteDeletionModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}

/**
 * @description Note Title or Description Update Service
 */
exports.noteUpdateTitleDescriptionService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}


/**
 * @description Note Title or Description Update Service
 */
exports.noteUpdateImageService = function (req, callback) {
    // console.log("req on service on note display", req);

    noteModel.noteUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}