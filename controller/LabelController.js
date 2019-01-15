/**
 * @description Controller for Label purpose
 * @author Yash
 * @version 1.0
 * @since 1/1/19
 */

const labelService = require('../services/LabelService');

/**
 * @description Label Addition Controller
 */
exports.addLabel = function(req, res, next) {

    try{
        
        labelService.LabelAddService(req.body, (err, result) => {
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
 * @description Label Display Controller
 */
exports.displayLabel = function(req, res, next) {
    
    try
    {
        labelService.labelDisplayService( req.headers.token, (err, result) => {
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
 * @description Label Updation Generic Controller
 */
exports.updateLabel = (req, res, next) => {

    console.log("req to update label---", req.body.note);

    try{
        
        labelService.labelUpdateService (req.body.note, (err, data) => {
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
 * @description Label Deletion Controller
 */
exports.deleteLabel = (req, res, next) => {
    try{
        
        labelService.labelDeletionService (req.body.note, (err, data) => {
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