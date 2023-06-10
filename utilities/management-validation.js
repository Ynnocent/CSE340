const utilities = require(".");
const invModel = require("../model/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlpha()
      .withMessage("Please provide a proper classification name"),
  ];
};

validate.checkClassificationInput = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Add New Classification",
      nav,
      errors,
      classification_name,
    });
    return;
  }
  next();
};

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .isAlpha()
      .withMessage("Please provide a proper car make"),

    body("inv_model")
      .trim()
      .isAlpha()
      .withMessage("Please provide a proper car make"),
    body("inv_year")
      .trim()
      .isNumeric()
      .withMessage("Please provide a proper car year"),
    body("inv_description")
      .notEmpty()
      .withMessage("Please provide description to your car"),
    body("inv_image")
      .notEmpty()
      .withMessage("Please add an image path"),
    body("inv_thumbnail")
      .notEmpty()
      .withMessage("Please add a thumbnail path"),
    body("inv_price")
      .trim()
      .isNumeric()
      .withMessage("Please provide a price for the car"),
    body("inv_miles")
      .trim()
      .isNumeric()
      .withMessage("Please provide the mileage of the car"),
    body("inv_color")
      .trim()
      .isAlpha()
      .withMessage("Please provide a color for the car"),
    body("classification_id")
      .notEmpty()
      .isNumeric()
      .withMessage("Please select classification"),
  ];
};

validate.checkInventoryInput = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  let errors = [];
  errors = validationResult(req);

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let dropdown = await utilities.getNewClassData();
    res.render("inventory/newInventory", {
      title: "Add New Car",
      nav,
      dropdown,
      errors,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
    return;
  }
  next();
};

module.exports = validate;