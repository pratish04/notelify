const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_DATABASE_PASSWORD,
  multipleStatements: true,
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig); 
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); 
    } 
    else{
      console.log("CONNECTED TO THE DATABASE!");
    }
  }); 
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err; 
    }
  });
}

handleDisconnect();

module.exports = connection;
