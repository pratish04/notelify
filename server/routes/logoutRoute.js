const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");

router.get("/", authorization, (req, res) => {
  try {
    res.clearCookie("accessToken", {
      path: "/",
    });
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
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
