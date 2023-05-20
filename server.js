//
//to run: "npm run dev"
//also run ./login.cmd
//to open redis database table: "redis-cli" (cli = command line interface)
const { createHash } = require("node:crypto");
const express = require("express");
const bodyparser = require("body-parser");
const redis = require("redis")
const app = express();
console.log("Prepare yourself for NoDEMON!!")
const port = 3000;
const redisclient = redis.createClient({url:"redis://127.0.0.1:6379"});

app.use(bodyparser.json()); //Allow json requests

app.listen(port, ()=> {
    redisclient.connect(); //The API server is trying to connect with Redis
    console.log("Listening on port " + port);
});

app.get("/", (req, res) => {
    res.send("Welcome to your Node Server!");
    // res.redirect("https://google.com")
});

app.post("/login",async (req,res)=>{
    const loginbody = req.body;
    const username = loginbody.username;
    const password = loginbody.password;
    //we need to hash the password the user gave us
    const hashedpassword = password==null ? null : createHash("sha3-256").update(password).digest("hex");
    
    const redispassword = password==null ? null : await redisclient.hGet("hashedpasswords",username);
    console.log("\nPassword for "+username+" "+redispassword)
    if (redispassword!=null && hashedpassword===redispassword){
        //this happens if the password is correct
        res.send("\n\nWelcome "+username+"!\n\n");
        
    } else {
        //this happens if the password is not correct
        res.status(401);//unauthorized
        res.send("Incorrect password");
    }

    
});
//NoDeMoN
//lookup express tutorial
