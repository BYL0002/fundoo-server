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
  sender: {
    type: String
  },
  userId: {
    type: schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  collabId: {
    type: {
      type: schema.Types.ObjectId,
      ref: 'user'
    }
  },
  reminder: {
    type: String
  },
  color: {
    type: String
  },
  image: {
    type: String
  },
  pin: {
    type: Boolean
  },
  archive: {
    type: Boolean
  },
  trash: {
    type: Boolean
  },
  labels: [{
    type: String
  }]
})

/**
 * @description Model creation on schema
 */
const note = mongoose.model("note", newSchema);

function noteFunction() {

}

/**
 * @description Note Save
 */
noteFunction.prototype.noteSaveModel = (req, callback) => {

  let newNote = new note({
    sender: req.sender,
    userId: req.userId,
    title: req.title,
    description: req.description,
    collaborator: req.collaborator,
    reminder: req.reminder,
    color: req.color,
    image: req.image,
    pin: req.pin,
    archive: req.archive,
    trash: req.trash
  })

  newNote.save(function (err, result) {
    if (err) {
      console.log('note saved error');

      return callback(err);
    }
    else {

      return callback(null, result);
    }
  })
}


/**
 * @description Notes Retrieve
 */
noteFunction.prototype.noteDisplayModel = (req, callback) => {
  // console.log('req for data retrieval----',req);

  note.find({ userId: req }, function (err, result) {
    if (err) {
      console.log('err of display on model', err);
      return callback(err);
    }
    else {

      return callback(null, result);
    }
  })
}

/**
 * @description Notes Find One
 */
noteFunction.prototype.noteFindOneNoteModel = (reqNoteId, callback) => {

  note.findOne({ _id: reqNoteId }, function (err, result) {
    if (err) {
      console.log('err of searching note on model ', err);
      return callback(err);
    }
    else {
      console.log('result of searching of note ', result);
      return callback(null, result);
    }
  })
}

/**
 * @description Notes Updation
 */
noteFunction.prototype.noteUpdateModel = (req, callback) => {

  console.log("req--", req);

  note.findByIdAndUpdate(req._id, req, (err, result) => {
    if (err) {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else {
      console.log('updated');
      return callback(null, result);
    }
  })

}

/**
 * @description Notes Updation of image
 */
noteFunction.prototype.noteUpdateImageModel = (reqBody, reqFile, callback) => {

  console.log("image", reqBody, '' + reqFile);

  note.findByIdAndUpdate(reqBody._id, { image: reqFile }, (err, result) => {
    if (err) {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else {
      console.log('updated');
      return callback(null, result);
    }
  })

}

/**
 * @description Notes Deletion
 */
noteFunction.prototype.noteDeletionModel = (req, callback) => {

  note.deleteOne({ _id: req }, function (err, result) {
    if (err) {

      return callback(err);
    }
    else {

      return callback(null, result);
    }
  })
}

/**
 * @description Notes Label Updation
 */
noteFunction.prototype.noteLabelEdittionModel = (req, callback) => {

  note.findByIdAndUpdate(req._id, {

    $push: {
      labels: req.label
    },

  },
    function (err, result) {
      if (err) {
        console.log('err on label push', err);
        return callback(err);
      }
      else {

        console.log('result of label pushed', result);


        // result.label.push(req.label);
        return callback(null, result);
      }
    })
}

/**
 * @description Notes Label Updation
 */
noteFunction.prototype.noteLabelsDisplayModel = (req, callback) => {

  note.findById(req._id,
    function (err, result) {
      if (err) {
        console.log('err on notes label display', err);
        return callback(err);
      }
      else {
        console.log('result of notes label display', result.labels);
        return callback(null, result.labels);
      }
    })
}

/**
 * @exports function to get database connected and get operation done on basis of request from client
 */
module.exports = new noteFunction;