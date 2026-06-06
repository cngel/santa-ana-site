const express = require("express");
const {PrismaClient} = require("@prisma/client");
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();
const mustache = require("mustache-express");
const path = require("path");
app.use(express.json());
app.use(cors({
    origin:'*',
    methods:["POST","GET"]
}
))
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/static"));

app.engine("mst", mustache());
app.set("view engine", "mst");
app.set("views", path.join(__dirname, "views"));

app.get("/",function(req,res){
    res.sendFile("index.html");
});

//rota de precos, para a unca pagina dinamica. a unica dinamica
app.get("/preco",async function(req,res){
    const data =await prisma.price.findFirst();
    console.log(data)
    res.render("preco",{
        propina:data.propina,
        cartao:data.cartao,
        uniforme_puniv:data.uniforme_puniv,
        uniforme_enfermagem:data.uniforme_enfermagem,
        manual:data.manual,
        matricula:data.matricula
    });
})

//rota para aceder ao painel preciso a proteger
app.get("/novela",function(req,res){
    res.sendFile(__dirname+"/login.html");
});



app.post("/post/price", async function(req,res){
     const response =await prisma.price.create(req.body) 
})
// /Listen do serer/
app.listen(3000,function(){
    console.log("tudo ok 3000");
})