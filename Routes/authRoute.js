const express = require('express');
const authController = require('../Controller/authController');

const authRouter = express.Router();

authRouter.route('/signup').post(authController.register);
authRouter.route('/login').post(authController.login);

module.exports = {authRouter};
