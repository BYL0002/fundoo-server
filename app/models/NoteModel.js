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
    type : String
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
 * @description Note Save
 */
noteFunction.prototype.noteSaveModel = (req, callback) => {
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
      console.log('note saved error');
      
      return callback(err);
    }
    else {
      console.log('note saved successful');
      
      return callback(null, result);
    }
  })
}


/**
 * @description Notes Retrieve
 */
noteFunction.prototype.noteDisplayModel = ( callback) => {
  note.find(function(err, result) {
    if(err)
    {
      console.log('err of display on model', err);
      return callback(err);
    }
    else
    {
      // console.log('result from db', result);
      return callback(null, result);
    }
  })
}

/**
 * @description Notes Find One
 */
noteFunction.prototype.noteFindOneNoteModel = (reqNoteId, callback) => {
  
  note.findOne({_id : reqNoteId}, function(err, result) {
    if(err)
    {
      console.log('err of searching note on model ', err);
      return callback(err);
    }
    else
    {
      console.log('result of searching of note ', result);
      return callback(null, result);
    }
  })
}


/**
 * @description Notes Updation
 */
noteFunction.prototype.noteUpdateModel = (req, callback) => {

  note.findByIdAndUpdate(req._id, req, (err, result) => {
    if(err)
    {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else
    {
      // console.log('update successful', result);
      console.log('update successful');
      return callback(null, result);
    }
  })

}


/**
 * @description Notes Color Updation
 */
noteFunction.prototype.noteUpdateColorModel = (req, callback) => {

  note.findByIdAndUpdate(req._id, req, (err, result) => {
    if(err)
    {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else
    {
      // console.log('update successful', result);
      console.log('update successful');
      return callback(null, result);
    }
  })

}

/**
 * @description Notes Reminder Updation
 */
noteFunction.prototype.noteUpdateReminderModel = (req, callback) => {

  note.findByIdAndUpdate(req._id, req, (err, result) => {
    if(err)
    {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else
    {
      // console.log('update successful', result);
      console.log('update successful');
      return callback(null, result);
    }
  })

}

/**
 * @description Notes Pin Updation
 */
noteFunction.prototype.noteUpdatePinModel = (req, callback) => {

  note.findByIdAndUpdate(req._id, req, (err, result) => {
    if(err)
    {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else
    {
      // console.log('update successful', result);
      console.log('update successful');
      return callback(null, result);
    }
  })

}

/**
 * @description Notes Trash Updation
 */
noteFunction.prototype.noteUpdateTrashModel = (req, callback) => {

  note.findByIdAndUpdate(req._id, req, (err, result) => {
    if(err)
    {
      console.log('error occured while updation', err);
      return callback(err);
    }
    else
    {
      // console.log('update successful', result);
      console.log('update successful');
      return callback(null, result);
    }
  })

}


/**
 * @exports function to get database connected and get operation done on basis of request from client
 */
module.exports = new noteFunction;