const express = require("express");
const redis = require("redis");

const redisClient = redis.createClient("redis://red-ci0c055269v9cqnmh0qg:6379");

redisClient.connect();

redisClient.on("connect", ()=>{
    console.log("CONNECTED TO REDIS!"); 
})

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports=redisClient;
