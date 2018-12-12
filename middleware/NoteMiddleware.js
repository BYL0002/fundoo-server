/**
 * @description Middleware page to get credentials check on middleware rather on controller directly
 * @author  Yash
 * @since   12/11/2018
 * @module  Server
 * @version 8.2
 */
const jwt = require('jsonwebtoken');
const staticFile = require('../config/static');
const AssertionError = require('assert').AssertionError;

/**
 * @description function formed as to perform middleware work for noteaddition
 */
exports.notesAddMiddleware = function noteAddMiddleware(req, res, next) {
    try {
        console.log('req token', req.body.header.token);
        
        jwt.verify(req.body.header.token, staticFile.privateKey, function(err,token){
            if(token) throw 'err'
            {
              next();
            }
        })
    }
    catch (err) {
        if (err instanceof AssertionError
            || err instanceof RangeError
            || err instanceof ReferenceError
            || err instanceof SyntaxError
            || err instanceof TypeError
            || err instanceof EvalError
        ) {
            console.log("Error:", (err));
            res.status(400).send(err);
        } else {
            console.log("Error:", err);
        }
    }
}