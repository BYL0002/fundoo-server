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
var cache = require('express-redis-cache')();
const router = express.Router();

const middleware = require('../middleware/UserMiddleware');
const noteMiddleware = require('../middleware/NoteMiddleware');

const controller = require('../controller/UserController');
const noteController = require('../controller/NoteController');
const labelController = require('../controller/LabelController');

const multer = require('multer');
var upload = multer({ dest: 'uploads/' });

//----------------------------------------------------------------Swagger related API-----------------------------------------------------------------------

// serve swagger
router.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

//----------------------------------------------------------------USER related API-----------------------------------------------------------------------

/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
router.post("/register", middleware.registerMiddleware, controller.registerController);

/**
 * post for login
 */
router.post('/login',controller.loginController);

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


//----------------------------------------------------------------NOTE API-----------------------------------------------------------------------

/**
 * post for NoteAddition
 */
router.post('/noteAddition', upload.single('image'), function (req, res, next) {
   console.log('image file', req.file, req.body);
//    console.log('file', req);
    next();
  }, noteMiddleware.notesAddMiddleware, noteController.addNote );

/**
 * get for Notes Display
 */


 /**
 * @swagger
 * definitions:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */
 /**
 * @swagger
 * /api/noteDisplay:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */

router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, cache.route({name:'getNotes', expire: 60}), noteController.displayNote );
// router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, noteController.displayNote );

/**
 * post for Note Updation Via Generic Nature
 */
router.post('/updateNote', noteMiddleware.notesAddMiddleware, noteController.updateNote );

/**
 * post for Note Updation for Color via individual api
 */
router.post('/updateNoteColor', noteMiddleware.notesAddMiddleware, noteController.updateNoteColor );

/**
 * post for Note Updation for Reminder via individual api
 */
router.post('/updateNoteReminder', noteMiddleware.notesAddMiddleware, noteController.updateNoteReminder );

/**
 * post for Note Updation for Pin via individual api
 */
router.post('/updateNotePin', noteMiddleware.notesAddMiddleware, noteController.updateNotePin );

/**
 * post for Note Updation for Trash via individual api
 */
router.post('/updateNoteTrash', noteMiddleware.notesAddMiddleware, noteController.updateNoteTrash );

/**
 * post for Note Updation for Image via individual api
 */
router.post('/updateNoteImage', upload.single('image'), (req, res, next) => {
  console.log('req.file', req.file);
  next();
} , noteMiddleware.notesAddMiddleware, noteController.updateNoteImage );

/**
 * post for Note Updation for Trash via individual api
 */
router.post('/deleteNote', noteMiddleware.notesAddMiddleware, noteController.deleteNote );

/**
 * post for Note Updation of Title or Description for Trash via individual api
 */
router.post('/updateNoteTitleDescription', noteMiddleware.notesAddMiddleware, noteController.UpdateNoteTitleDescription );


//----------------------------------------------------------------LABEL API-----------------------------------------------------------------------

/**
 * post for Label Addition
 */
router.post('/AddLabel', noteMiddleware.notesAddMiddleware, labelController.addLabel );

/**
 * post for Label Updation
 */
router.post('/updateLabel', noteMiddleware.notesAddMiddleware, labelController.updateLabel );

/**
 * post for Label Deletion
 */
router.post('/deleteLabel', noteMiddleware.notesAddMiddleware, labelController.deleteLabel );

/**
 * get for Label Display
 */
router.get('/labelDisplay', noteMiddleware.notesAddMiddleware, cache.route({name:'getLabel', expire: 60}), labelController.displayLabel );

//----------------------------------------------------------------COLLABORATOR API-----------------------------------------------------------------------

/**
 * post for Collaborator Addition
 */
router.post('/AddCollab', noteMiddleware.notesAddMiddleware, labelController.addLabel );

/**
 * get for Collaborator Details
 */
router.get('/DisplayCollab', noteMiddleware.notesAddMiddleware, labelController.displayLabel );


/**
 * @exports express_router so the flow can include express router and get the proper routng to required task
 */
module.exports = router;