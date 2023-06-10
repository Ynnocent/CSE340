const classificationModel = require("../model/classification-model");
const invModel = require("../model/inventory-model");
const utilities = require("../utilities/");

async function buildManagement(req, res, next) {
  let updatedNav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Add New Classification",
    nav: updatedNav,
    errors: null,
  });
}

async function buildNewItem(req, res, next) {
  let nav = await utilities.getNav();
  let dropdown = await utilities.getNewClassData();
  res.render("inventory/newInventory", {
    title: "Add New Car",
    nav,
    errors: null,
    dropdown,
  });
}

async function createNewClassification(req, res, next) {
  const { classification_name } = req.body;
  let newClassification = await classificationModel.createNewClassification(
    classification_name
  );

  if (newClassification) {
    let nav = await utilities.getNav();
    let newClassData = await utilities.getNewClassData();
    req.flash("success", "A new classification has been added");
    res.status(201).render("inventory/newInventory", {
      title: "Add New Car",
      nav,
      dropdown: newClassData,
      errors: null,
    });
  } else {
    let dropdown = await utilities.getNewClassData();
    req.flash("error", "An error has occured. Failed to add classification");
    res.status(500).render("inventory/management", {
      title: "Add New Classification",
      nav,
      errors: null,
      dropdown,
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
    classification_id,
  } = req.body;
  console.log(req.body);
  try {
    const newInventoryItem = await invModel.createNewInventoryItem(
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    );
    console.log(newInventoryItem);
    if (newInventoryItem) {
      let dropdown = await utilities.getNewClassData();
      let nav = await utilities.getNav();
      req.flash(
        "success",
        "Congratulations, a new car has been added into the inventory"
      );
      res.status(201).render("inventory/management", {
        title: "Add New Classification",
        nav,
        errors: null,
        dropdown,
      });
    }
  } catch (error) {
    let dropdown = await utilities.getNewClassData();
    req.flash("error", "Error creating car");
    res.status(500).render("inventory/management", {
      title: "Add New Classification",
      nav,
      errors: null,
      dropdown,
    });
  }
}

module.exports = {
  buildManagement,
  buildNewItem,
  createNewClassification,
  createNewInventory,
};
