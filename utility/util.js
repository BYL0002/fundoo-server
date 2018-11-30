/**
 * @description Token generation program
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */
const jwt = require('jsonwebtoken');
var util = require('util');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const nodemailer = require('nodemailer');
// const mail = require('/')

/**
 * @description Token generation code method
 */
let tokenGeneration = (user) => {
    let payload = {
        user : user
    }

    let privateKey = "privateKey";

    var i = 'bridgelabz';          // Issuer 
    var s = `login - ${user}`;        // Subject 
    var a = 'http://mysoftcorp.in'; // Audience

    // SIGNING OPTIONS
    var signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "1h"
    };

    let token = jwt.sign(payload, privateKey, signOptions);
    // console.log('token on util - ',token);
    return token;
}

/**
 * @description Method to send mails to users on different tasks
 */
let mailSender = (userDetails) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'labzbridge02@gmail.com',
            pass: 'bridge01!'
        }
    });
    
    let mailOptions;

    mailOptions = {
        from: 'labzbridge02@gmail.com', // sender address
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
eventEmitter.on('userVerify', function(userDetails) {
    console.log('on called');
    mailSender(userDetails);
})


/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitter.on('forgotPassword', function(userDetails) {
    console.log('on called');
    mailSender(userDetails);
})

/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitter.on('login', function(userDetails) {
    console.log('on called');
    mailSender(userDetails);
})

/**
 * @description Event Listener to send mails to users on different tasks
 */
eventEmitter.on('register', function(userDetails) {
    console.log('on called');
    mailSender(userDetails);
})

module.exports ={ eventEmitter, mailSender, tokenGeneration};