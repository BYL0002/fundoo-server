/**
 * @description Controller for notes purpose
 * @author Yash
 * @version 1.0
 * @since 11/12/18
 */

const noteService = require('../services/NoteService');
const fs = require('fs');

/**
 * @description Note Addition Controller
 */
exports.addNote = function(req, res, next) {

    try{
        
        noteService.NoteAddService(req.body, (err, result) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : result
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
    
}

/**
 * @description Note Display wihtout Collab Controller
 */
exports.displayNote = function(req, res, next) {
    
    try
    {
        noteService.NoteDisplayService( req.headers.token, (err, result) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                res.status(200).send({
                    status : true,
                    message : result
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Complete Display Controller
 */
exports.displayCompleteNoteDetails = function(req, res, next) {
    // console.log('req.headers.token----', req.headers.token);
    
    try
    {
        noteService.getCompleteNoteDataService( req.headers.token, (err, result) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                res.status(200).send({
                    status : true,
                    message : result
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Updation Generic Controller
 */
exports.updateNote = (req, res, next) => {
    try{
        
        noteService.noteUpdateService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Update Color Controller
 */
exports.updateNoteColor = (req, res, next) => {
    try{
        
        noteService.noteUpdateColorService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Update Reminder Controller
 */
exports.updateNoteReminder = (req, res, next) => {
    try{
        
        noteService.noteUpdateReminderService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Update Reminder Controller
 */
exports.updateNotePin = (req, res, next) => {
    try{
        
        noteService.noteUpdatePinService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Update Reminder Controller
 */
exports.updateNoteTrash = (req, res, next) => {
    try{
        
        
        noteService.noteUpdateTrashService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}


/**
 * @description Note Deletion Controller
 */
exports.deleteNote = (req, res, next) => {
    try{
        
        noteService.noteDeletionService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}

/**
 * @description Note Title Description Update Controller
 */
exports.UpdateNoteTitleDescription = (req, res, next) => {
    try{
        
        noteService.noteUpdateTitleDescriptionService (req.body.note, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}


/**
 * @description Note Image Update Controller
 */
exports.updateNoteImage = (req, res, next) => {
    try{

        let file = new Buffer(fs.readFileSync(req.file.path)).toString("base64");
        let fileFinal ='data:image/jpg;base64, '+file; 
    
        noteService.noteUpdateImageService (req.body, fileFinal, (err, data) => {
            if(err)
            {
                res.status(400).send({
                    status : false,
                    message : 'error'
                })
            }
            else
            {
                
                res.status(200).send({
                    status : true,
                    message : data
                })
            }
        })
    }
    catch(err)
    {
        next(err);
    }
}