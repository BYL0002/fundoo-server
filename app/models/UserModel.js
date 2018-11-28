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
     name : {type : String},
     email_id : {type : String},
     password : {type : String, default : ""},
     token : {type : String}
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


 userFunction.prototype.registerUserVerifyModel = (req, callback ) => {
  let newUser = new user ({
      name : req.name,
      email_id : req.email,
      token : req.token
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

    user.findOne({ email_id: req.email, password: req.password }, function (err, result) {
      if (result == null) {
        console.log('error in checking ', err);
        return callback(err);
      }
      else {
        return callback(null, result);
        // if (bcrypt.compareSync(req.passw, result.password)) {
        //   console.log("compare result");
        //   console.log(result);
          // return callback(null, result);
        // }
        // else {
        //   console.log("compare null");
          // return callback(null);
        // }
      }
  
    })
  }  

/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.logoutModel = function (req, callback) {

    user.findOne({ email_id: req.loggedUser }, function (err, result) {
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


/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.findAndSaveTokenModel = function (req, callback) {

  user.findOneAndUpdate({ token: req.token }, {password : req.password}, function (err, result) {
    if (err) {
      console.log(err);
      return callback(err);
    }
    else {
      user.findOne({_id : result._id}, function(err, data) {
        if(err) 
        {
          console.log(err);
          return callback(err);
        }
        else 
        {
          console.log('Successful Token match');
          console.log('Successful data retrieved is : ');
          return callback(null, data);
        }
      })
    }
  })
}

 module.exports = new userFunction;