const express = require('express');
const authController = require('../Controller/authController');
const empController = require('../Controller/empController');

const empRouter = express.Router();

empRouter.route('/').get(authController.protect, empController.getAllEmp);
empRouter.route('/').post(authController.protect, empController.addEmp);
empRouter
    .route('/:id')
    .patch(authController.protect, empController.updateEmp)
    .delete(authController.protect, empController.deleteEmp);

module.exports = {empRouter};
