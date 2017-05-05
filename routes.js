const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  const apiController = require('./apiController');

  router.post('/:method', apiController.executeMethod);

  app.use('/', router);
};
