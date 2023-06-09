const express = require('express');
const router = express.Router();
const utilities = require("../utilities/index");
const managementController = require("../controller/managementController");
const regValidate = require("../utilities/account-validation");

router.get("/", utilities.handleErrors(managementController.buildManagement));
router.post("/newclass", utilities.handleErrors(managementController.createNewClassification));
router.post("/newitem", utilities.handleErrors(managementController.createNewInventory));
module.exports = router;