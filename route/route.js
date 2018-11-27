const express = require('express');
const app = express();
const router = express.Router();

const middleware = require('../middleware/UserMiddleware');
const controller = require('../controller/UserController');

router.post("/register", middleware.register, controller.registerController);

module.exports = router;