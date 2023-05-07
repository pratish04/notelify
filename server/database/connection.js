const express = require('express');
const mysql = require('mysql');
require("dotenv").config();

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.DATABASE_PASSWORD,    
        database: "notes",
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
