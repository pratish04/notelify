const express = require("express");
const redis = require("redis");

require("dotenv").config();

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.connect();

redisClient.on("connect", ()=>{
    console.log("CONNECTED TO REDIS!"); 
})

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports=redisClient;
