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
const controller = require('../controller/UserController');

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
 * get for messages for chatting application
 */
router.post('/logout', middleware.logoutMiddleware, controller.logoutController);
/**
 * get for messages for chatting application
 */
router.post('/registerUserVerify', middleware.registerUserVerifyMiddleware, controller.registerUserVerifyController);
/**
 * get for messages for chatting application
 */
router.post('/forgotpassword', middleware.registerUserVerifyMiddleware, controller.forgotPasswordController);

/**
 * @exports express_router so the flow can include express router and get the proper routng to required task
 */
module.exports = router;