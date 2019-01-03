/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

const usermodel = require('../app/models/UserModel');
const noteModel = require('../app/models/NoteModel');
const labelModel = require('../app/models/LabelModel');
const async = require('async');

/**
 * @description notes save service
 */
exports.LabelAddService = function (req, callback) {
    console.log('req on service', req);

    async.waterfall([

        function (callback) {

            usermodel.FindOneModel(req.sender, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, data._id);
                }
            })
        },
        function (result, callback) {
            req.userId = result;
            noteModel.noteFindOneNoteModel(req.noteId, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    req.noteId = data._id;
                    let count = 0;
                    for (let i = 0; i < data.label.length; i++) {
                        if (data.label[i] == req.label) {
                            count++;
                        }
                    }

                    if (count == 0) {
                        noteModel.noteLabelEdittionModel(req, (err, data) => {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback(null, data);
                            }
                        })
                    }
                }
            })
        }
    ],

        function (err, result) {

            req.noteId = result._id;

            labelModel.labelFindOneNoteModel(req.labelId, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {

                    let count = 0;

                    for (let i = 0; i < data.noteId.length; i++) {
                        if (data.noteId[i] == req.noteId) {
                            count++;
                        }
                    }

                    if (count == 0) {

                        labelModel.labelNoteEdittionModel(req, (err, data) => {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback(null, data);
                            }
                        })
                    }

                }
            })
        }
    )
}

/**
 * @description Note Display Service
 */
exports.labelDisplayService = function (req, callback) {

    labelModel.labelDisplayModel(req, (err, data) => {
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
exports.labelDeletionService = function (req, callback) {
    console.log("req on service on note display", req);

    labelModel.labelDeletionModel(req, (err, data) => {
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
exports.labelUpdateService = function (req, callback) {
    console.log("req on service on note display", req);

    labelModel.labelUpdateModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

}