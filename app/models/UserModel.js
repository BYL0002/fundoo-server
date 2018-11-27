/**
 * @description Services for operaions on request by user as client
 * @author Yash
 * @since   26/11/2018
 * @version 1.1
 */

 const mongoose = require('mongoose');
 const schema = mongoose.Schema;

 /**
  * @description Schema created via mongoose
  */
 const newSchema = new schema({
     email_id : {type:String},
     password : {type:String}
 })

/**
 * @description Model creation on schema
 */
 const user = mongoose.model("user", newSchema);

 function userFunction() {

 }

 userFunction.prototype.registerModel = (req, callback ) => {
     let newUser = new user ({
         email_id : req.email,
         password : req.password
     })

     newUser.save(function(err, result) {
         if(err) {
            return callback(err);
         }
         else {
            return callback(null, result);
         }
     })
 }


/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.loginModel = function (req, callback) {

    console.log("model login user bcrpt");
    console.log(req.email);
    console.log(req.passw);
    user.findOne({ email_id: req.email }, function (err, result) {
      if (result == null) {
        console.log('error in checking ', err);
        return callback(err);
      }
      else {
  
        if (bcrypt.compareSync(req.passw, result.password)) {
          console.log("compare result");
          console.log(result);
          return callback(null, result);
        }
        else {
          console.log("compare null");
          return callback(null);
        }
      }
  
    })
  }  

/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.logoutModel = function (req, callback) {

    user.findOne({ email_id: req.body.log_user_email_id }, function (err, result) {
      if (err) {
  
        console.log(err);
        return callback(err);
      }
      else {
        console.log('Logout Successful');
        return callback(null, result);
      }
    })
  }

 module.exports = new userFunction;