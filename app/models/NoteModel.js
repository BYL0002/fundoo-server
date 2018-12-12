/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   11/12/2018
 * @version 1.1
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * @description Schema created via mongoose
 */
const newSchema = new schema({
  sender : {
    type : String
  },
  user_id : {
    type : schema.Types.ObjectId,
    ref : 'user'
  },
  title : {
    type: String
  },
  description : {
    type : String
  },
  collaborator : {
    type : { 
      type : schema.Types.ObjectId,
      ref : 'user'
     }
  },
  reminder : {
    type : Date
  },
  color : {
    type : String
  },
  image : {
    type : String
  },
  pin : {
    type : Boolean
  },
  archive : {
    type : Boolean
  },
  trash : {
    type : Boolean
  }
})

/**
 * @description Model creation on schema
 */
const note = mongoose.model("note", newSchema);

function noteFunction() {

}

/**
 * @description Note Save Mode
 */
noteFunction.prototype.noteSave = (req, callback) => {
  let newNote = new note({
    sender : req.sender,
    user_id : req.user_id,
    title: req.title,
    description: req.description,
    collaborator: req.collaborator,
    reminder: req.reminder,
    color: req.color,
    image: req.imageUrl,
    pin: req.pin,
    archive: req.archive,
    trash: req.trash
  })

  newNote.save(function (err, result) {
    if (err) {
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  })
}

/**
 * @exports function to get database connected and get operation done on basis of request from client
 */
module.exports = new noteFunction;