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
 * post for messages for chatting application
 */
router.post('/logout', middleware.logoutMiddleware, controller.logoutController);

/**
 * post for messages for chatting application
 */
router.post('/registerUserVerify', middleware.registerUserVerifyMiddleware, controller.registerUserVerifyController);

/**
 * post for messages for chatting application
 */
router.post('/forgotpassword', middleware.forgotPasswordMiddleware, controller.forgotPasswordController);

/**
 * post method of express to send controls to controller from routes through middleware
 * post for registration
 */
router.post("/registerEventEmitter", controller.registerEventEmitterController);

/**
 * post for messages for chatting application
 */
router.post('/registerUserVerifyEventEmitter', controller.registerUserVerifyEventEmitterController);

/**
 * post for messages for chatting application
 */
router.post('/forgotPasswordEventEmitter', controller.forgotPasswordEventEmitterController);

/**
 * post for messages for chatting application
 */
router.post('/noteAddition', noteMiddleware.notesAddMiddleware, noteController.addNote );

/**
 * get for messages for chatting application
 */
router.get('/noteDisplay', noteMiddleware.notesAddMiddleware, noteController.displayNote );

/**
 * post for messages for chatting application
 */
router.post('/updateNote', noteMiddleware.notesAddMiddleware, noteController.displayNote );


/**
 * @exports express_router so the flow can include express router and get the proper routng to required task
 */
module.exports = router;