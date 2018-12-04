/**
 * @description Middleware page to get credentials check on middleware rather on controller directly
 * @author  Yash
 * @since   12/11/2018
 * @module  Server
 * @version 8.2
 */

const AssertionError = require('assert').AssertionError;

/**
 * @description function formed as to perform middleware work for login
 */
exports.loginMiddleware = function login_middleware(req, res, next) {
    try {

        if (req.body.data.email === null || req.body.data.email.length === 0 || req.body.data.email === undefined) throw 'email empty'
        {
            if (req.body.data.password === null || req.body.data.password.length === 0 || req.body.data.password === undefined) throw 'password empty'
            {
                if ((/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email) == false)) throw 'email not valid'
                {
                    if ((req.body.data.password.length >= 5) == false) throw 'password length not valid'
                    {
                        if ((/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.data.password)) == false) throw 'password not valid'
                        {
                            next();
                        }
                    }
                }
            }
        }
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
            // return callback("Something bad happened");
        } else {
            console.log("Error:", err);
            // return callback(err);
        }
        // console.log(err);
    }

}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.registerMiddleware = function (req, res, next) {
    console.log('register api');
    console.log(req.body);
    try {
        if (req.body.data.token == null || req.body.data.token.length === 0 || req.body.data.token === undefined) throw 'token empty'
        {
            if (req.body.data.password1 === null || req.body.data.password1.length === 0 || req.body.data.password1 === undefined) throw 'password empty'
            {
                if ((req.body.data.password1.length >= 5) == false) throw 'password length invalid'
                {
                    if ((/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.password1)) == false) throw 'password invalid'
                    {
                        next();
                    }
                }
            }
        }
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

/**
 * @description function formed as to perform middleware work for registration
 */
exports.registerUserVerifyMiddleware = function (req, res, next) {
    console.log('req on middleware');
    console.log(req.body);
    console.log(req.body.data.email);

    try 
    {
        if (req.body.data.email == null || req.body.data.email.length === 0 || req.body.data.email === undefined) throw 'email empty'
        {
            if (req.body.data.name === null || req.body.data.name.length === 0 || req.body.data.name === undefined) throw 'name empty'
            {
                if ( (/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email)) == false ) throw 'email invalid'
                {
                    next();
                }
            }
        }
    }
    catch(err) 
    {
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

/**
 * @description function formed as to perform middleware work for registration
 */
exports.logoutMiddleware = function (req, res, next) {
    console.log('middleware logout', req.body.data.email);

    try {
        if (req.body.data.email === null || req.body.data.email === undefined || req.body.data.email.length === 0) throw ' email empty'
        {
            if ( (/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email)) == false ) throw 'email invalid'
            {
                next();
            }
        }
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

/**
 * @description function formed as to perform middleware work for registration
 */
exports.forgotPasswordMiddleware = function (req, res, next) {

    try {
        if (req.body.data.email === null || req.body.data.email === undefined || req.body.data.email.length === 0) throw ' email empty'
        {
            if ( (/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email)) == false ) throw 'email invalid'
            {
                next();
            }
        }
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
