/**
 * @description Token generation program
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */
const jwt = require('jsonwebtoken');
var staticFile = require('../config/static');
const EventEmitter = require('events');
const eventEmitterObj = new EventEmitter();
const nodemailer = require('nodemailer');
// const mail = require('/')

/**
 * @description Token generation code method
 */
let tokenGeneration = (user) => {
    let payload = {
        user : user
    }

    let privateKey = staticFile.privateKey;

    var subject = `login - ${user}`;        // Subject 

    // SIGNING OPTIONS
    var signOptions = {
        issuer: staticFile.issuer,
        subject: subject,
        audience: staticFile.audience,
        expiresIn: staticFile.expiresIn
    };

    let token = jwt.sign(payload, process.env.privateKey, signOptions);
    // console.log('token on util - ',token);
    return token;
}

/**
 * @description Method to send mails to users on different tasks
 */
let mailSender = (userDetails) => {

    var transporter = nodemailer.createTransport({
        service: staticFile.service,
        auth: {
            user: process.env.user_id,
            pass: process.env.password
        }
    });
    
    let mailOptions;
    // console.log(process.env.user_id);
    // console.log(process.env.password);

    mailOptions = {
        from: process.env.user_id, // sender address
        to: userDetails.to,
        subject: userDetails.subject,
        html: userDetails.html
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log('Email not sent');
        }
        else {
            console.log('Email Sent');
        }                    
    });
}

/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitterObj.on('userVerify', function(userDetails) {
    console.log('on called');
    mailSender(userDetails);
})


/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitterObj.on('forgotPassword', function(userDetails) {
    console.log('forgotPassword on called');
    mailSender(userDetails);
})

/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitterObj.on('userVerify', function(userDetails) {
    console.log('userVerify on called');
    mailSender(userDetails);
})

/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitterObj.on('register', function(userDetails) {
    console.log('register on called');
    mailSender(userDetails);
})

module.exports ={ eventEmitterObj, mailSender, tokenGeneration};