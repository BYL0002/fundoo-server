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
  name: { type: String },
  email_id: { type: String },
  password: { type: String, default: "" },
  token: { type: String },
  profilePic:{type : String }
})

/**
 * @description Model creation on schema
 */
const user = mongoose.model("user", newSchema);
const bcryptjs = require('bcryptjs');

function userFunction() {

}

/**
 * @description Register Process to get user details & send link to verify
 */
userFunction.prototype.registerUserVerifyModel = (req, callback) => {
  let newUser = new user({
    name: req.name,
    email_id: req.email,
    token: req.token
  })

  newUser.save(function (err, result) {
    if (err) {
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  })
}

/**
 * @description 
 */
userFunction.prototype.forgotPasswordModel = (req, callback) => {

  user.findOneAndUpdate({ email_id: req.email }, { token: req.token }, function (err, result) {
    user.findOne({ _id: result._id }, function (err, data) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      else {
        console.log('Successful Token match');
        console.log('Successful data retrieved is : ', data);
        return callback(null, data);
      }
    })
  })
}


/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.loginModel = function (req, callback) {

  user.findOne({ email_id: req.email }, function (err, result) {
    if (result == null) {
      console.log('error in checking ', err);
      return callback(false);
    }
    else {
      bcryptjs.compare(req.password, result.password, function (err, resultFinal) {
        if (resultFinal == false) {
          console.log('resultFinal',resultFinal);
          console.log('err',err);
          return callback(false);
        }
        else {
          console.log('resultFinal : ', resultFinal);
          return callback(null, result);
        }
      });
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
 * @description Finding ONE data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.FindOneModel = function (req, callback) {

  user.findOne({ email_id : req }, function (err, result) {
    if (err) {

      console.log(err);
      return callback(err);
    }
    else {
      console.log('Found Successful');
      // console.log('result', result);
      
      return callback(null, result);
    }
  })
}

/**
 * @description Finding ALL data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.FindAllModel = function (req, callback) {

  user.find((err, result) => {
    if (err) {

      console.log(err);
      return callback(err);
    }
    else {
      console.log('Found all Successful', result);
      // console.log('result', result);
      
      return callback(null, result);
    }
  })
}

/**
 * @description Finding data inside database
 * make this available to our users in our Node applications
 */
userFunction.prototype.findAndSaveTokenModel = function (req, callback) {
  // console.log('req on model find&saveTokenmodel', req);


  bcryptjs.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err)
    }
    else {

      bcryptjs.hash(req.password, salt, function (err, hash) {
        if (err) {
          return callback(err);
        }
        else {

          user.findOneAndUpdate({ token: req.token }, { password: hash }, function (err, result) {
            if (err) {
              console.log(err);
              return callback(err);
            }
            else {
              user.findOne({ _id: result._id }, function (err, data) {
                if (err) {
                  console.log(err);
                  return callback(err);
                }
                else {
                  console.log('Successful Token match');
                  // console.log('Successful data retrieved is : ', data);
                  return callback(null, data);
                }
              })
            }
          })
        }
      })
    }
  })
}
module.exports = new userFunction;