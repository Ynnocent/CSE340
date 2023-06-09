const invModel = require("../model/inventory-model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* ****************************************
 * Middleware to check token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        res.locals.accountData = accountData;
        res.locals.loggedin = 1;
        next();
      }
    );
  } else {
    next();
  }
};

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next();
  } else {
    req.flash("notice", "Please log in.");
    return res.redirect("/account/login");
  }
};

Util.getNewClassData = async function (req, res, next) {
  let data = await invModel.getClassifications();
  console.log(data.rows);
  let dropdown = '<select name="classification_id">';
  dropdown += '<option value="">Select a classification</option>';
  data.rows.forEach((row) => {
    dropdown +=
      '<option value="' +
      row.classification_id +
      '">' +
      row.classification_name +
      "</option>";
  });
  dropdown += "</select>";
  return dropdown;
};

Util.buildClassificationItem = async function (data) {
  let grid;
  if (data.length > 0) {
    const mileage = data[0].inv_miles;
    const options = { style: "decimal", maximumFractionDigits: 2 };
    const dataMileage = mileage.toLocaleString("en-US", options);
    grid = '<ul id="car-display">';
    console.log(data);

    grid +=
      '<a href="../../inv/detail/' +
      data[0].inv_id +
      '" title="View ' +
      data[0].inv_make +
      " " +
      data[0].inv_model +
      'details"><img src="' +
      data[0].inv_image +
      '" alt="Image of ' +
      data[0].inv_make +
      " " +
      data[0].inv_model +
      ' on CSE Motors" /></a>';
    grid += '<div class="namePrice">';
    grid += "<hr />";
    grid += "<h2>";
    grid +=
      '<a href="../../inv/detail/' +
      data[0].inv_id +
      '" title="View ' +
      data[0].inv_make +
      " " +
      data[0].inv_model +
      ' details">' +
      data[0].inv_make +
      " " +
      data[0].inv_model +
      "</a>";
    grid += "</h2>";
    grid += "<h3> Year: " + data[0].inv_year + "</h3>";
    grid +=
      "<h3>$" +
      new Intl.NumberFormat("en-US").format(data[0].inv_price) +
      "</h3>";
    grid += "<h3>" + "Mileage: " + "<span>" + dataMileage + "</span>" + "</h3>";
    grid += "<p>" + data[0].inv_description + "</p>";

    grid += '<div class="purchaseLinks">';
    grid += "<hr />";
    grid += '<a href="#">' + "Buy Now!" + "</a>";
    grid += '<a href="#">' + "Contact Us!" + "</a>";
    grid += '<a href="#">' + "Schedule Test Drive!" + "</a>";
    grid += "</div>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
