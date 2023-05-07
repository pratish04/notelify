const express = require("express");
const router = express.Router();

const authorization = require("../middlewares/authorization");

router.get("/", authorization, (req, res)=>{
    try{
        res.clearCookie("accessToken", {
            path: "/",
        }).send({
            loggedOut: true, 
            message: "SUCCESSFULLY LOGGED OUT!"
        });
    }catch(err){
        console.error("LOGOUT FAILURE!", err); 
        res.send({message: "LOGOUT FAILURE!"});   
    }
});

module.exports=router;