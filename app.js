const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database,{useNewUrlParser:true});

mongoose.connection.on('connected',()=>{
    console.log('connected to databae ',config.database)
})

mongoose.connection.on("error",(error)=>{console.log(error)})

const app = express();
const users = require('./routes/users');

const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use('/users',users)

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/',(req,res)=>{
    res.send("invalid endpoint")
})

app.listen(port,()=>{console.log("Server started at " + port)})