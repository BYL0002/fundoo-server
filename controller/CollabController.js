/**
 * @description Controller for Label purpose
 * @author Yash
 * @version 1.0
 * @since 1/1/19
 */

const CollabService = require('../services/CollabService');

/**
 * @description Label Addition Controller
 */
exports.addCollab = function(req, res, next) {

    try{
        
        CollabService.LabelAddService(req.body, (err, result) => {
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
exports.displayCollab = function(req, res, next) {
    
    try
    {
        CollabService.labelDisplayService( req.headers.token, (err, result) => {
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
exports.updateCollab = (req, res, next) => {
    try{
        
        CollabService.labelUpdateService (req.body.note, (err, data) => {
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
exports.deleteCollab = (req, res, next) => {
    try{
        
        CollabService.labelDeletionService (req.body.note, (err, data) => {
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