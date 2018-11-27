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

 module.exports = new userFunction;