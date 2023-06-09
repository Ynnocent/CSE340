const classificationModel = require("../model/classification-model");
const invModel = require("../model/inventory-model");
const utilities = require("../utilities/");


async function buildManagement(req, res, next) {
  let nav = utilities.getNav();

  res.render("inventory/management", {
    title: "Management",
    nav,
    errors: null,
  });
}

async function createNewClassification(req, res, next) {
  const { classification_name } = req.body;

  try {
    const newClassificationModel =
      classificationModel.createNewClassification(classification_name);
    if (newClassificationModel) {
        let newclass = classification_name;
      req.flash(
        "Notice",
        "Conhratulations, a new classification has been created"
      );
      res.status(201).render("inventory/management", {
        title: "Management",
        nav,
        newclass,
        error: null,
      });
    }
  } catch (error) {
    req.flash(
      "Notice",
      "There has been a problem in creating a new classification"
    );
    
    res.status(500).render("inventory/management", {
      title: "Management",
      nav,
      errors,
    });
  }
}

async function createNewInventory(req, res, next) {
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
  } = req.body;
  try {
    const newInventoryItem = invModel.createNewInventoryItem(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    );

    if (newInventoryItem) {
        req.flash("Notice", "Congratulations, a new car has been added into the inventory");
        res.status(201).render("inventory/management",{
            title: "Management",
            nav,
            errors: null,
        })
    }
  } catch (error) {
    req.flash("Notice", "Error creating car");
    res.status(500).render("inventory/management", {
        title: "Management",
        nav,
        errors,
    })
  }
}

module.exports = { buildManagement, createNewClassification, createNewInventory };
