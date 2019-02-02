/**
 * @author Yash
 * @description 
 * @version 2.3
 * @since 12/11/2018
 * @package express, express router
 */

/**
 * importing express
 */
const express = require('express');
// var cache = require('express-redis-cache')();
const router = express.Router();

const middleware = require('../middleware/UserMiddleware');
const noteMiddleware = require('../middleware/NoteMiddleware');

const controller = require('../controller/UserController');
const noteController = require('../controller/NoteController');
const labelController = require('../controller/LabelController');
const collabController = require('../controller/CollabController');

var aws = require('aws-sdk');
// var busboy = require('busboy');

// const BUCKET_NAME = '';
// const IAM_USER_KEY = '';
// const IAM_USER_SECRET = '';

const multer = require('multer');
var multerS3 = require('multer-s3')

// var upload = multer({ dest: 'uploads/' });

// var app = express()
var s3 = new aws.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    // bucket: process.env.bucketName,
    bucket: 'fundoo-image-upload',

    metadata: function (req, file, cb) {
      console.log('file in metadata-----', file);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log('file in key-----', file);
      cb(null, Date.now().toString());
    }
  })
})

// ---------------------------------------------------------------------------------------

// let s3bucket = new AWS.S3({
//   accessKeyId: IAM_USER_KEY,
//   secretAccessKey: IAM_USER_SECRET,
//   Bucket: BUCKET_NAME
// });
// s3bucket.createBucket(function () {
//     var params = {
//       Bucket: BUCKET_NAME,
//       Key: file.name,
//       Body: file.data
//     };
//     s3bucket.upload(params, function (err, data) {
//       if (err) {
//         console.log('error in callback');
//         console.log(err);
//       }
//       console.log('success');
//       console.log(data);
//     });
// });

//----------------------------------------------------------------Swagger related API-----------------------------------------------------------------------

// serve swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));
//----------------------------------------------------------------USER related API-----------------------------------------------------------------------

/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
router.post("/register", middleware.registerMiddleware, controller.registerController);

/**
 * post for login
 */
router.post('/login', controller.loginController);

/**
 * post for logout
 */
router.post('/logout', middleware.logoutMiddleware, controller.logoutController);

/**
 * post for registering user and verifying
 */
router.post('/registerUserVerify', middleware.registerUserVerifyMiddleware, controller.registerUserVerifyController);

/**
 * post for forgot password linking
 */
router.post('/forgotpassword', middleware.forgotPasswordMiddleware, controller.forgotPasswordController);

/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
router.post("/registerEventEmitter", controller.registerEventEmitterController);

/**
 * post for register user verification & Through Event Emitter
 */
router.post('/registerUserVerifyEventEmitter', controller.registerUserVerifyEventEmitterController);

/**
 * post for forgot password through Event Emitter
 */
router.post('/forgotPasswordEventEmitter', controller.forgotPasswordEventEmitterController);

/**
 * get All User Details
 */
router.get('/AllUsersDetails', controller.userAllDetailsController);


//----------------------------------------------------------------NOTE API-----------------------------------------------------------------------

/**
 * post for NoteAddition
 */
// router.post('/noteAddition', upload.single('image'), function (req, res, next) {
//    console.log('image file', req.file, req.body);
// //    console.log('file', req);
//     next();
//   }, noteMiddleware.notesAddMiddleware, noteController.addNote );

router.post('/noteAddition', noteMiddleware.notesAddMiddleware, noteController.addNote);

/**
 * get for Notes Display
 */

//Commenting it just to make docker run without redis
// router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, cache.route({ name: 'getNotes', expire: 30 }), noteController.displayCompleteNoteDetails);

//just to make noteDisplay api run without cache as redis port getting conflict in docker
router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, noteController.displayCompleteNoteDetails);

// router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, cache.route({name:'getNotes', expire: 60}), noteController.displayNote );
// router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, noteController.displayNote );

/**
 * post for Note Updation Via Generic Nature
 */
router.post('/updateNote', noteMiddleware.notesAddMiddleware, noteController.updateNote);

/**
 * post for Note Updation for Color via individual api
 */
router.put('/updateNoteColor', noteMiddleware.notesAddMiddleware, noteController.updateNoteColor);

/**
 * post for Note Updation for Reminder via individual api
 */
router.post('/updateNoteReminder', noteMiddleware.notesAddMiddleware, noteController.updateNoteReminder);

/**
 * post for Note Updation for Pin via individual api
 */
router.post('/updateNotePin', noteMiddleware.notesAddMiddleware, noteController.updateNotePin);

/**
 * post for Note Updation for Trash via individual api
 */
router.post('/updateNoteTrash', noteMiddleware.notesAddMiddleware, noteController.updateNoteTrash);

/**
 * post for Note Updation for Image via individual api
 */

//Before S3 implementation

// router.post('/updateNoteImage', upload.single('image'), (req, res, next) => {
//   console.log('req.file', req.file);
//   next();
// } , noteMiddleware.notesAddMiddleware, noteController.updateNoteImage );


//After S3 Implementation

router.post('/updateNoteImage', upload.single(('image'), (err, data) => {
  if (err) {
    console.log('err in uploading image', err);
  }
  else {
    console.log('data in uploading image', data);
    next();
  }
}),
  (req, res, next) => {
    console.log('req.file', req.file);
    console.log('req.file', req.file.path);
    console.log('successful uploadation on Amazon S3', req.file.length, ' image files!');
    next();
  }, noteMiddleware.notesAddMiddleware, noteController.updateNoteImage);

/**
 * post for Note Updation for Trash via individual api
 */
router.post('/deleteNote', noteMiddleware.notesAddMiddleware, noteController.deleteNote);

/**
 * post for Note Updation of Title or Description for Trash via individual api
 */
router.post('/updateNoteTitleDescription', noteMiddleware.notesAddMiddleware, noteController.UpdateNoteTitleDescription);

//----------------------------------------------------------------LABEL API-----------------------------------------------------------------------

/**
 * post for Label Addition
 */
router.post('/AddLabel', noteMiddleware.notesAddMiddleware, labelController.addLabel);

/**
 * post for Label Updation
 */
router.post('/updateLabel', noteMiddleware.notesAddMiddleware, labelController.updateLabel);

/**
 * post for Label Deletion
 */
router.post('/deleteLabel', noteMiddleware.notesAddMiddleware, labelController.deleteLabel);

/**
 * get for Label Display
 */
// router.get('/labelDisplay', noteMiddleware.notesAddMiddleware, cache.route({ name: 'getLabel', expire: 60 }), labelController.displayLabel);

//----------------------------------------------------------------COLLABORATOR API-----------------------------------------------------------------------

/**
 * post for Collaborator Addition
 */
router.post('/AddCollab', noteMiddleware.notesAddMiddleware, collabController.addCollab);

/**
 * get for Collaborator Details
 */
router.get('/DisplayCollab', noteMiddleware.notesAddMiddleware, collabController.displayCollab);

/**
 * delete for 
 */

/**
 * @exports express_router so the flow can include express router and get the proper routng to required task
 */
module.exports = router;