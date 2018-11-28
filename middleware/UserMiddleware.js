/**
 * @description Middleware page to get credentials check on middleware rather on controller directly
 * @author  Yash
 * @since   12/11/2018
 * @module  Server
 * @version 8.2
 */

/**
 * @description function formed as to perform middleware work for login
 */
exports.loginMiddleware = function login_middleware(req, res, next) {
    
    if(req.body.email === null || req.body.email.length === 0 || req.body.email === undefined) 
    {
        console.log('Email Error');
        next(err);
    } 
    else if (req.body.password === null || req.body.password.length === 0 || req.body.password === undefined) 
    {
        console.log('Password Error');
        next(err);
    } 
    else 
    {
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.email))
        {
            if(req.body.password.length >= 5)
            {
                if(/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.password))
                {
                    next();
                }
                else {
                    console.log('Password Invalid');                    
                }
            }
            else {
                console.log('Password Incorrect');                
            }
        }
        else {
            console.log('Email_id not correct');            
        }
    }
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.registerMiddleware = function (req, res, next) {
    
    if(req.body.email == null || req.body.email.length === 0 || req.body.email === undefined) 
    {
        console.log('Email Error');
        next(err);
    } 
    else if (req.body.password1 === null || req.body.password1.length === 0 || req.body.password1 === undefined) 
    {
        console.log('Password Error');
        next(err);
    }
    else 
    {
        
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.email))
        {
            if(req.body.password1.length >= 5)
            {
                if(/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.password1))
                {
                    next();
                }
                else {
                    console.log('Password Invalid');                    
                }
            }
            else {
                console.log('Password Incorrect');                
            }
        }
        else {
            console.log('Email_id not correct');            
        }
    }
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.logoutMiddleware = function (req, res, next) {
    console.log('middleware logout', req.body.email);
    
    if(req.body.email === null || req.body.email === undefined || req.body.email.length === 0) {
        console.log('Email Error');
        next(err);
    }
    else {
        next();
    }
} 