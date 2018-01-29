const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  const apiController = require('./apiController');

  router.get('/status', apiController.executeStatus);

  app.use('/', router);
};
