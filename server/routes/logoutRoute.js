const express = require("express");
const router = express.Router();
const redis = require("redis");

const authorization = require("../middlewares/authorization");
const redisClient = require("../database/redisClient");

router.get("/", authorization, async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    await redisClient.set(token, 1);
    await redisClient.expireAt(token, req.data.iat + 24 * 60 * 60);
    console.log("TOKEN BLACKLISTED!");
    res.clearCookie("accessToken");
    res.send({
      loggedOut: true,
      message: "SUCCESSFULLY LOGGED OUT!",
    });
  } catch (err) {
    console.error("LOGOUT FAILURE!", err);
    res.send({ message: "LOGOUT FAILURE!" });
  }
});

module.exports = router;
