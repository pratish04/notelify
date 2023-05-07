const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");

const db = require("../database/connection.js");

router.delete("/", authorization, (req, res)=>{
        try{
            db.query("DELETE FROM notes WHERE noteId=?", 
                [req.body.id],
                (err, result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.status(200).send({
                            noteDeleted: true, 
                            message: "NOTE DELETED SUCCESSFULLY!"
                        });
                        console.log("NOTE DELETED SUCCESSFULLY!");    
                    }
                } 
            )
        }catch(err){
            res.send({message: "NOTE DELETION FAILURE!"});   
            console.log("NOTE DELETION FAILURE!", err);
        }
})

module.exports=router;