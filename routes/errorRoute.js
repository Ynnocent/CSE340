// Needed Resources 
const express = require("express")
const router = new express.Router() 
const errorController = require("../controller/errorController")
const utilities = require('../utilities/')

router.get('/server-error', utilities.handleErrors(errorController.buildHome))

module.exports = router