const express = require('express');
const topicsRouter = express.Router();
const { getTopics } = require('../controllers/mainController');

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;