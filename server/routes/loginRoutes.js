const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
require("dotenv").config();

const authorization = require("../middlewares/authorization");

const db = require("../database/connection.js");

router.get("/", authorization, (req, res) => {
  res.send({ validToken: true });
});

router.post("/", (req, res) => {
  try {
    db.query(
      "SELECT * FROM users WHERE email=?",
      [req.body.email],
      (err1, result1) => {
        if (err1) {
          console.log(err1);
        } else if (result1.length === 0) {
          res.send({
            accountDoesNotExist: true,
            message: "ACCOUNT DOES NOT EXIST!",
          });
          console.log("ACCOUNT DOES NOT EXIST!");
        } else {
          bcrypt.compare(
            req.body.password,
            result1[0].password,
            (err2, result2) => {
              if (err2) {
                console.log(err2);
              } else if (result2) {
                const token = jwt.sign(
                  {
                    userId: result1[0].userId,
                    iat: Math.round(new Date().getTime() / 1000),
                  },
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
                  .send({ message: "USER LOGGED IN!" });
                console.log("USER LOGGED IN!");
              } else {
                res.send({
                  wrongCombination: true,
                  message: "WRONG EMAIL/PASSWORD COMBINATION!",
                });
                console.log("WRONG EMAIL/PASSWORD COMBINATION!");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log("USER LOGIN FAILURE!", err);
  }
});

module.exports = router;
