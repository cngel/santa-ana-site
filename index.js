require("dotenv").config();
const express = require("express");
const {PrismaClient} = require("@prisma/client");
const cors = require("cors");
const mustache = require("mustache-express");
const path = require("path");
const router = require("./router.js");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({origin:'*',methods:["POST","GET"]}))
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/static"));
app.use("/",router);
app.engine("mst", mustache());
app.set("view engine", "mst");
app.set("views", path.join(__dirname, "views"));
app.use(function(req,res){
    res.sendFile(__dirname+"/static/index.html");
})


// /Listen do serer/
app.listen(3000,function(){
    console.log("tudo ok 3000");
})