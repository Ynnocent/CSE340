const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");
const managementController = require("../controller/managementController");
const managementValidation = require("../utilities/management-validation");


router.get("/newitem", utilities.handleErrors(managementController.buildNewItem));
router.get("/", utilities.handleErrors(managementController.buildManagement));

router.post(
  "/newclass",
  managementValidation.classificationRules(),
  managementValidation.checkClassificationInput,
  utilities.handleErrors(managementController.createNewClassification)
);
router.post(
  "/newitem",
  managementValidation.inventoryRules(),
  managementValidation.checkInventoryInput,
  utilities.handleErrors(managementController.createNewInventory)
);
module.exports = router;
