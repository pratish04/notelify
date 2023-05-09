const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const dbConfig = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.DATABASE_PASSWORD,
  multipleStatements: true,
};

let connection = mysql.createConnection(dbConfig);

function handleDisconnect(){
  connection=mysql.createConnection(dbConfig);
}

connection.connect((err) => {
  if (err) {
    console.error("ERROR CONNECTING TO THE DATABASE!", err);
    setTimeout(handleDisconnect, 2000);
    return;
  }
  console.log("CONNECTED TO THE DATABASE!");
});

connection.on("error", (err) => {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("DATABASE CONNECTION CLOSED!");
    handleDisconnect();
  } else if (err.code === "ETIMEDOUT") {
    console.error("DATABASE CONNECTION TIMEOUT!");
    handleDisconnect();
  } else {
    console.error("Database error occurred!", err);
  }
});

module.exports = connection;
