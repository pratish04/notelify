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

    connection.connect((err)=> {
        if (err) {
          console.log("ERROR CONNECTING TO THE DATABASE");
        }
        else {
          console.log("CONNECTED TO THE DATABASE!");
        }
      });
    
module.exports=connection;
