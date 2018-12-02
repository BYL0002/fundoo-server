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
    
    if(req.body.data.email === null || req.body.data.email.length === 0 || req.body.data.email === undefined) 
    {
        console.log('Email Error');
        next('error');
    } 
    else if (req.body.data.password === null || req.body.data.password.length === 0 || req.body.data.password === undefined) 
    {
        console.log('Password Error');
        next('error');
    } 
    else 
    {
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email))
        {
            if(req.body.data.password.length >= 5)
            {
                if(/^[a-zA-Z0-9][\w!]{5,9}$/g.test(req.body.data.password))
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
    console.log('register api');
    console.log(req.body);   
    
    if(req.body.data.token == null || req.body.data.token.length === 0 || req.body.data.token === undefined) 
    {
        console.log('Token Error');
        next('error');
    } 
    else if (req.body.data.password1 === null || req.body.data.password1.length === 0 || req.body.data.password1 === undefined) 
    {
        console.log('Password Error');
        next('error');
    }
    else 
    {
        if(req.body.data.password1.length >= 5)
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
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.registerUserVerifyMiddleware = function (req, res, next) {
    console.log('req on middleware');
    console.log(req.body);        
    console.log(req.body.data.email);
    
    
    if(req.body.data.email == null || req.body.data.email.length === 0 || req.body.data.email === undefined) 
    {
        console.log('Email Error');
        next('error');
    } 
    else if (req.body.data.name === null || req.body.data.name.length === 0 || req.body.data.name === undefined) 
    {
        console.log('Name Error');
        next('error');
    }
    else 
    {
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email))
        {
            next();
        }
        else {
            console.log('Email Invalid');                    
        }
    }
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.logoutMiddleware = function (req, res, next) {
    console.log('middleware logout', req.body.data.email);
    
    if(req.body.data.email === null || req.body.data.email === undefined || req.body.data.email.length === 0) {
        console.log('Email Error');
        next('error');
    }
    else {
        next();
    }
}

/**
 * @description function formed as to perform middleware work for registration
 */
exports.forgotPasswordMiddleware = function (req, res, next) {
    
    if(req.body.data.email == null || req.body.data.email.length === 0 || req.body.data.email === undefined) 
    {
        console.log('Email Error');
        next('error');
    }
    else 
    {
        if(/^[a-z](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/g.test(req.body.data.email))
        {
            next();
        }
        else {
            console.log('Email Invalid');                    
        }
    }
}
