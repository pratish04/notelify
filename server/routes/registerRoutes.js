const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const db = require("../database/connection");

const registerQueryPromise1 = (req) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email=?;",
      [req.body.email],
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length !== 0) {
          reject({
            emailAlreadyInUse: true,
            message: "USER REGISTRATION FAILURE!",
          });
        } else {
          resolve(result);
        }
      }
    );
  });
};

const registerQueryPromise2 = (req) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return reject(err);
      else {
        db.query(
          "INSERT INTO users (email, password, joinedOn) VALUES(?, ?, CURRENT_TIMESTAMP);",
          [req.body.email, hash],
          (error, results) => {
            if (error) {
              return reject(error);
            } else {
              return resolve(results);
            }
          }
        );
      }
    });
  });
};

const registerQueryPromise3 = (req) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT userId FROM users WHERE email=?;",
      [req.body.email],
      (error, results) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      }
    );
  });
};

router.post("/", async (req, res) => {
  try {
    const result1 = await registerQueryPromise1(req);
    const result2 = await registerQueryPromise2(req);
    const result3 = await registerQueryPromise3(req);
    const token = jwt.sign(
      { userId: result3[0].userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send({
        registrationSuccessful: true,
        message: "USER REGISTRATION SUCCESSFUL!",
      });
    console.log("USER REGISTRATION SUCCESSFUL!");
  } catch (error) {
    console.log("USER REGISTRATION FAILURE!", error);
    res.send(error);
  }
});

module.exports = router;
