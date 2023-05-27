// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controller/invController")
const utilities = require('../utilities/')

// Route to build inventory by classification view
// router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByClassificationViewItem));

module.exports = router;
