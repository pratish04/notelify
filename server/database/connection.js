const express = require('express');
const mysql = require('mysql');
require("dotenv").config();

const connection = mysql.createConnection({
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.DATABASE_PASSWORD,    
        multipleStatements: true,
    });

    connection.connect((err) => {
      if (err) {
        console.error("ERROR CONNECTING TO THE DATABASE!", err);
        return;
      }
    
      console.log("CONNECTED TO THE DATABASE!");
    });
    connection.on('error', (err) => {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("DATABASE CONNECTION CLOSED!");
      } else if (err.code === 'ETIMEDOUT') {
        console.error("DATABASE CONNECTION TIMEOUT!");
      } else {
        console.error("Database error occurred: ", err);
      }

      connection.connect((err) => {
        if (err) {
          console.error("ERROR CONNECTING TO THE DATABASE!", err);
        } else {
          console.log("RECONNECTED TO THE DATABASE!");
        }
      });
    });
    
module.exports=connection;
