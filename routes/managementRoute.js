const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");
const invController = require("../controller/invController")
const managementValidation = require("../utilities/management-validation");


router.get("/newitem", utilities.handleErrors(invController.buildNewItem));
router.get("/", utilities.handleErrors(invController.buildManagement));

router.post(
  "/newclass",
  managementValidation.classificationRules(),
  managementValidation.checkClassificationInput,
  utilities.handleErrors(invController.createNewClassification)
);
router.post(
  "/newitem",
  managementValidation.inventoryRules(),
  managementValidation.checkInventoryInput,
  utilities.handleErrors(invController.createNewInventory)
);
module.exports = router;
