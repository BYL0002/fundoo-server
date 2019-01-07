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
 * @description Collab complete Data Display Service
 */
exports.collabDisplayService = function (req, callback) {

    collabmodel. .labelDisplayModel(req, (err, data) => {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, data);
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

exports.getCollabNotesUserId = (req, callback) => {

    collabmodel.getCollabNotesUserId(req, (err, result) => {
        if(err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}


exports.getCollabDetails = (callback) => {
    console.log("30");

    usermodel.FindAllModel( (err, result) => {
        if(err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}


// ------------------------------------------------------

// /**
//  * @param {object} data
//  * @param {callback function} callback
//  */
// exports.getNotes = (userIDRes, callback) => {
//     // user.findUserID(data, (err, userIDRes) => {
//     //     if (err) {
//     //         callback(err);
//     //     }
//     //     else {
//             var finalResult = [];
//             note.getNotes(userIDRes, (err, result) => {
//                 if (err) {
//                     callback(err);
//                 } else {
//                     user.findByUserId(userIDRes, (errorUser, resultUser) => {
//                         if (errorUser) {
//                             callback(errorUser);
//                         } else {
//                             const noteOwner ={
//                                 firstname:resultUser.firstname,
//                                 lastname:resultUser.lastname,
//                                 username:resultUser.username,
//                                 _id:resultUser._id
//                             }
//                             for (var i = 0; i < result.length; i++) {
//                                 var userNote = {
//                                     note: result[i],
//                                     owner: noteOwner,
//                                     collab: []
//                                 }
//                                 finalResult.push(userNote);
//                             }
//                             collabService.getCollabOwnerUserId(userIDRes, (errorCollab, resultOwnerCollab) => {
//                                 if (errorCollab) {
//                                     callback(errorCollab);
//                                 } else {
//                                     for (var i = 0; i < finalResult.length; i++) {
//                                         for (var j = 0; j < resultOwnerCollab.length; j++) {
                                            
//                                             if (finalResult[i].note._id.equals(resultOwnerCollab[j].noteID)) {                                               
//                                                 finalResult[i].collab.push(resultOwnerCollab[j].collabUserID)
//                                             }
//                                         }
//                                     }
//                                 }
//                             })
//                             collabService.getCollabNotesUserId(userIDRes, (errorCollab, resultCollab) => {
//                                 if (errorCollab) {
//                                     callback(errorCollab);
//                                 } else {
//                                     var operations = [];
//                                     for (var i = 0; i < resultCollab.length; i++) {
//                                         operations.push((function (collabData) {

//                                             return function (callback) {

//                                                 collabService.getDataByNoteId(collabData.noteID, (errorNote, resultNote) => {
//                                                     console.log("123 : ", resultNote);

//                                                     if (errorNote) {
//                                                         callback(errorNote)
//                                                     } else {
//                                                         var collabUserArray = [];
//                                                         for (var i = 0; i < resultNote.length; i++) {
//                                                             collabUserArray.push(resultNote[i].collabUserID)
//                                                         }
//                                                         var collabNote = {
//                                                             note: resultNote[0].noteID,
//                                                             owner: resultNote[0].userID,
//                                                             collab: collabUserArray
//                                                         }
//                                                         finalResult.push(collabNote);
//                                                         callback(null, collabNote)

//                                                     }
//                                                 })
//                                             }

//                                         })(resultCollab[i]))
//                                     }
//                                     async.series(operations, (errorAsync, resultAsync) => {
//                                         console.log(resultAsync);

//                                         if (errorAsync) {
//                                             callback(errorAsync);
//                                         } else {
//                                             console.log("final result ", finalResult);

//                                             callback(null, finalResult)
//                                         }
//                                     })
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })
//         // }
//     // })
// }


