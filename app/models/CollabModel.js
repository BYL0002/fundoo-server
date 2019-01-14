/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   11/12/2018
 * @version 1.3
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

/**
 * @description Schema created via mongoose
 */
const newSchema = new schema({
    userId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    noteId: {
        type: schema.Types.ObjectId,
        ref: 'note'
    },
    collabId: {
        type: schema.Types.ObjectId,
        ref: 'user'
    }
})

/**
 * @description Model creation on schema
 */
const collab = mongoose.model("collab", newSchema);

function collabFunction() {

}

/**
 * @description Label Save
 */
collabFunction.prototype.collabSaveModel = (req, callback) => {

    console.log('req on save', req);

    let newCollab = new collab({
        userId: req.userId,
        noteId: req.noteId,
        collabId: req.collabId
    })

    newCollab.save(function (err, result) {
        if (err) {
            console.log('collab saved error');

            return callback(err);
        }
        else {
            console.log('collab saved');

            return callback(null, result);
        }
    })
}

/**
 * @description Notes Deletion
 */
collabFunction.prototype.collabDeletionModel = (req, callback) => {

    collab.deleteOne({ _id: req }, function (err, result) {
        if (err) {
            return callback(err);
        }
        else {
            return callback(null, result);
        }
    })
}

collabFunction.prototype.getDataByNoteId = (noteID, callback) => {

    collab.find({ noteId: noteID }).populate("userId").populate("noteId").populate("collabId").exec((err, result) => {
        if (err) {
            callback(err);
        } else {
            console.log('result of getCollabNotesUserId ', result);

            callback(null, result);
        }
    })
}

//userId---collabs id

collabFunction.prototype.getCollabNotesUserId = (userID, callback) => {

    collab.find({ collabId: userID }, (err, result) => {
        if (err) {
            callback(err);
        } else {
            console.log('result of getCollabNotesUserId ', result);

            callback(null, result);
        }
    })
}

collabFunction.prototype.getCollabOwnerUserId = (userID, callback) => {

    collab.find({ userId: userID }).populate("collabId").exec((err, result) => {
        if (err) {
            callback(err);
        } else {

            console.log('result of getCollabOwnerUserId ------- ', result);

            callback(null, result);
        }
    })
}

/**
 * @exports function to get database connected and get operation done on basis of request from client
 */
module.exports = new collabFunction;