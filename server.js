//
//to run: "npm run dev"
//also run ./login.cmd
//to open redis database table: "redis-cli" (cli = command line interface)
const { createHash } = require("node:crypto");
const https = require('https');
const express = require("express");
const bodyparser = require("body-parser");
const redis = require("redis")
const app = express();
console.log("Prepare yourself for NoDEMON!!")
const port = 3000;
const redisclient = redis.createClient({url:"redis://default:redis-stedi-jacob:6379"});
const fs = require('fs')



// https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/archive/jacobpacker.cit270.com/privkey1.pem'), // THis is a private key
//   cert: fs.readFileSync('/etc/letsencrypt/archive/jacobpacker.cit270.com/cert1.pem'),
//   ca: fs.readFileSync('/etc/letsencrypt/archive/jacobpacker.cit270.com/chain1.pem') // This is a self-signed certificate

//   // key: fs.readFileSync('server.key'), This is an old part, we used to use our own certificate
//   // cert: fs.readFileSync('server.cert')
// }, app)
app.listen(port, () => {
  redisclient.connect();
  console.log('Listening...')
  console.log('Running...')
})



app.get('/', (req, res) => {
    // res.send('Hello user!')
    res.send(`
    <head><link rel="icon" type="image/x-icon" href="https://images.emojiterra.com/google/android-12l/512px/1f609.png"></head>
    <button onclick="window.location.href='https://jacob-packer.github.io/wdd130/week-1/index.html';">Jacob Packer</button>
    `)
  })
  
//   https.createServer({}, app).listen(3000, () => {
//     console.log('Listening...')
//   })

app.use(bodyparser.json()); //Allow json requests

// app.listen(port, ()=> {
//     redisclient.connect(); //The API server is trying to connect with Redis
//     console.log("Listening on port " + port);
// });

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
