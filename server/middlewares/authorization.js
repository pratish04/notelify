const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authorization = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      res.send({ noToken: true, message: "USER AUTHENTICATED!" });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log("ERROR WHILE VERIFYING TOKEN!", err);
          res.send({
            tokenInvalid: true,
            message: "INVALID TOKEN! KINDLY REAUTHENTICATE!",
          });
        } else {
          req.data = { userId: decoded.userId };
          next();
        }
      });
    }
  } catch {
    console.log("CAUGHT DURING TOKEN VERIFICATION!");
  }
};

module.exports = authorization;
