const express = require('express')
const usersRouter = express.Router()
const {getUsers} = require('../controllers/mainController')

usersRouter.get('/',getUsers)

module.exports = usersRouter