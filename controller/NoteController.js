/**
 * @description Controller for notes purpose
 * @author Yash
 * @version 1.0
 * @since 11/12/18
 */

const noteService = require('../services/NoteService');

exports.addNote = function(req, res, next) {

    try{
        // console.log('req on controller -----------------', req);
        // console.log('------------------------------------------------------------------------------------');
        
        
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

exports.displayNote = function(req, res, next) {
    // console.log('controller display notes');
    
    try
    {
        noteService.NoteDisplayService( (err, result) => {
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

exports.updateNote = (req, res, next) => {
    try{
        // console.log('req body on controller', req.body);
        
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
                // console.log('data on controller on exit');
                // console.log(data);
                
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

exports.updateNoteColor = (req, res, next) => {
    try{
        // console.log('req body on controller', req.body);
        
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
                // console.log('data on controller on exit');
                // console.log(data);
                
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