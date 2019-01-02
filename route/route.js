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

/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
router.post("/register", middleware.registerMiddleware, controller.registerController);

/**
 * post for login
 */
router.post('/login', middleware.loginMiddleware , controller.loginController);

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
 * post for NoteAddition
 */
router.post('/noteAddition', noteMiddleware.notesAddMiddleware, noteController.addNote );

/**
 * get for Notes Display
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
// router.post('/updateNoteImage', noteMiddleware.notesAddMiddleware, noteController.updateNoteImage );

/**
 * post for Note Updation for Trash via individual api
 */
router.post('/deleteNote', noteMiddleware.notesAddMiddleware, noteController.deleteNote );

/**
 * post for Note Updation of Title or Description for Trash via individual api
 */
router.post('/updateNoteTitleDescription', noteMiddleware.notesAddMiddleware, noteController.UpdateNoteTitleDescription );

/**
 * @exports express_router so the flow can include express router and get the proper routng to required task
 */
module.exports = router;