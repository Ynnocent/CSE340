const pool = require("../database");

async function createNewClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

async function checkExistingClassification(classification_name) {
  try {
    const sql = "SELECT FROM classification WHERE classification_name = $1";
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

module.exports = { createNewClassification, checkExistingClassification };
