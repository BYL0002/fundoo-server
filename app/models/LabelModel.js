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
  labels: {
    type: String
  }
})

/**
 * @description Model creation on schema
 */
const label = mongoose.model("label", newSchema);

function labelFunction() {

}

/**
 * @description Label Save
 */
labelFunction.prototype.labelSaveModel = (req, callback) => {

  console.log('req', req);
  
  let newLabel = new label({
    sender: req.sender,
    userId: req.userId,
    labels: req.label
  })

  newLabel.save(function (err, result) {
    if (err) {
      console.log('label saved error');

      return callback(err);
    }
    else {
      console.log('label saved');
      
      return callback(null, result);
    }
  })
}


/**
 * @description labels Retrieval
 */
labelFunction.prototype.labelDisplayModel = (req, callback) => {
  // console.log('req for data retrieval----',req);

  label.find({ userId: req }, function (err, result) {
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
 * @description label Find One
 */
labelFunction.prototype.labelFindOneLabelModel = (reqLabelId, callback) => {

  note.findOne({ _id: reqLabelId }, function (err, result) {
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
 * @description labels Updation Model
 */
labelFunction.prototype.labelUpdateModel = (req, callback) => {

  label.findByIdAndUpdate(req._id, req, (err, result) => {
    if (err) {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else {
      
      return callback(null, result);
    }
  })

}


/**
 * @description labels Updation Model
 */
labelFunction.prototype.labelUpdateCreateModel = (req, callback) => {

  label.findOneAndUpdate({ userId : req.userId }, { $push: { labels: req.label } }, (err, result) => {
    if (err) {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else {
      
      return callback(null, result);
    }
  })

}


/**
 * @description Notes Deletion
 */
labelFunction.prototype.labelDeletionModel = (req, callback) => {

  label.deleteOne({ _id: req }, function (err, result) {
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
labelFunction.prototype.labelNoteEdittionModel = (req, callback) => {

    note.findById({ _id: req.labelId }, function (err, result) {
      if (err) {
  
        return callback(err);
      }
      else {
  
        result.noteId.push(req.noteId);
        return callback(null, result);
      }
    })
  }
  

/**
 * @exports function to get database connected and get operation done on basis of request from client
 */
module.exports = new labelFunction;