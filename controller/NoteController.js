/**
 * @description Controller for notes purpose
 * @author Yash
 * @version 1.0
 * @since 11/12/18
 */

const noteService = require('../services/NoteService');

exports.addNote = function(req, res, next) {

    try{
        noteService.NoteAddService(req.body.data, (err, result) => {
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
    try
    {
        noteService.NoteDisplayService((err, result) => {
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