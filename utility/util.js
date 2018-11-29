/**
 * @description Token generation program
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

/**
 * @description Token generation code method
 */
exports.tokenGeneration = (user) => {
    let payload = {
        data: 'data01'
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

/**'
 * @description Method to send mails to users on different tasks
 */
exports.mailSender = (user, check) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'labzbridge02@gmail.com',
            pass: 'bridge01!'
        }
    });
    
    let mailOptions;

    /**
     * @description setting login send details
     */
    if(check === "login") 
    {
        mailOptions = {
            from: 'labzbridge02@gmail.com', // sender address
            to: user, // list of receivers
            subject: 'Activity Review', // Subject line
            html: '<p>Account logged on Fundoo Notes !</p>'// plain text body
        };
    }
    /**
     * @description setting register send details
     */
    else if (check === "register") 
    {
        mailOptions = {
            from: 'labzbridge02@gmail.com', // sender address
            to: user, // list of receivers
            subject: 'Registration Successful on Fundoo Notes', // Subject line
            html: '<p>Your are most Welcome to Fundoo Notes anytime. Thank You!</p>'// plain text body
        };
    }
    /**
     * @description setting verifyUser send details
     */
    else if(check === "verifyUser")
    {
        let token = this.tokenGeneration(user);
        mailOptions = {
            from: 'labzbridge02@gmail.com', // sender address
            to: user, // list of receivers
            subject: 'Registration Link for Fundoo Notes', // Subject line
            html: '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>' // plain text body
        };
    }
    /**
     * @description setting resetPassword send details
     */
    else
    {
        let token = this.tokenGeneration(user);
        mailOptions = {
            from: 'labzbridge02@gmail.com', // sender address
            to: user, // list of receivers
            subject: 'Reset Password Link for Fundoo Notes', // Subject line
            html: '<p>Click <a href = "http://localhost:3000/setpassword/'+ token+ '">here</a> to activate account.</p>' // plain text body    
        };
    }
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
            console.log('Email not sent');
            // console.log(err)
        }
        else {
            console.log('Email Sent');
            // console.log(info);
        }                    
    });
}