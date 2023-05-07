const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");

const db = require("../database/connection.js");

router.get("/", authorization, (req, res) => {
  try {
    db.query(
      "SELECT * FROM notes where userId=? ORDER BY createdOn DESC",
      [req.data.userId],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send({ result: result, userId: req.data.userId });
        }
      }
    );
  } catch {
    res.send({ message: "Home get failure!" });
    console.log("Home get failure!");
  }
});

router.post("/", authorization, (req, res) => {
  try {
    db.query(
      "INSERT INTO notes (noteId, noteTitle, noteContent, userId, createdOn) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE noteTitle=?, noteContent=?, createdOn=CURRENT_TIMESTAMP;",
      [
        req.body.id,
        req.body.title,
        req.body.content,
        req.body.userId,
        req.body.title,
        req.body.content,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send({
            noteSaved: true,
            message: "NOTE SAVED SUCCESSFULLY!",
          });
          console.log("NOTE SAVED SUCCESSFULLY!");
        }
      }
    );
  } catch (err) {
    res.send({ message: "NOTE SAVING FAILURE!", err });
  }
});

module.exports = router;
