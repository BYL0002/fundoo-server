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
    // console.log('req on service', req);

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

            labelModel.labelSaveModel(req, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    // req.noteId = data._id;
                    // let count = 0;
                    // for (let i = 0; i < data.label.length; i++) {
                    //     if (data.label[i] == req.label) {
                    //         count++;
                    //     }
                    // }

                    // if (count == 0) {
                    //     noteModel.noteLabelEdittionModel(req, (err, data) => {
                    //         if (err) {
                    //             callback(err);
                    //         }
                    //         else {
                    callback(null, data);
                    //     }
                    // })
                }
                // }
            })
        }
    ],

        function (err, result) {

            // req.noteId = result._id;

            // noteModel.noteFindOneNoteModel(req.labelId, (err, data) => {
            //     if (err) {
            //         callback(err);
            //     }
            //     else {

            //         let count = 0;

            //         for (let i = 0; i < data.noteId.length; i++) {
            //             if (data.noteId[i] == req.noteId) {
            //                 count++;
            //             }
            //         }

            //         if (count == 0) {

            //             labelModel.labelNoteEdittionModel(req, (err, data) => {
            //                 if (err) {
            //                     callback(err);
            //                 }
            //                 else {
            //                     callback(null, data);
            //                 }
            //             })
            //         }

            //     }
            // })

            // labelModel.labelUpdateCreateModel(req, (err, data) => {
            //     if (err) {
            //         return callback(err);
            //     }
            //     else {
            //         return callback(null, data);
            //     }
            // })

            // labelModel.labelSaveModel(req, (err, data) => {
            if (err) {
                return callback(err);
            }
            else {
                return callback(null, result);
            }
            // })
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
            // console.log('labels---', data);            
            return callback(null, data);
        }
    })
}


/**
 * @description Note Trash Update Service
 */
exports.labelDeletionService = function (req, callback) {
    console.log("req on service on note display", req);

    async.waterfall([

        function (callback) {

            noteModel.noteLabelsDisplayModel(req._id, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    let tempLabels = [];
                    let count = 0;
                    for (let i = 0; i < data.label.length; i++) {
                        if (data[i] == req.label) {
                            count++;
                        }
                        else {
                            tempLabels.push(data[i])
                        }
                    }
                    callback(null, count, tempLabels);
                }
            })
        }
    ],

        function (err, counter, result) {

            if (counter == 0) {
                console.log('counter == 0 err--', err);                
                return callback(err);
            }
            else {
                let notesLabelsUpdated = {
                    _id: req._id,
                    label: result
                }
                noteModel.noteLabelEdittionModel(notesLabelsUpdated, (err, resultFinal) => {
                    if (err) {
                        console.log('counter != 0 err--', err);
                        return callback(err);
                    }
                    else {
                        console.log('counter != 0 resultFinal--', err);
                        return callback(null, resultFinal);
                    }
                })
            }
        }
    )
}

/**
 * @description Note Title or Description Update Service
 */
exports.labelUpdateService = function (req, callback) {

    console.log("req on service on note display", req);

    noteModel.noteLabelEdittionModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
        }
    })

    // labelModel.labelUpdateModel

}