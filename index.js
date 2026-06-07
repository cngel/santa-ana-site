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


//rota para aceder ao painel preciso a proteger
app.get("/novela", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});



app.post("/post/price", async function(req, res) {
    try {

        const data = await prisma.price.update({
            where: {
                id: 1 // ou o id fixo do teu sistema
            },
            data: {
                matricula: req.body.matricula,
                propina: req.body.propina,
                manual: req.body.manual,
                cartao: req.body.cartao,
                uniforme_puniv: req.body.uniforme_puniv,
                uniforme_enfermagem: req.body.uniforme_enfermagem
            }
        });

        res.json({
            message: "Atualizado com sucesso",
            data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
app.get("/preco", async function(req,res){

    const data = await prisma.price.findFirst({where:{id:1}});

    res.render("preco", {
        propina: data?.propina,
        cartao: data?.cartao,
        uniforme_puniv: data?.uniforme_puniv,
        uniforme_enfermagem: data?.uniforme_enfermagem,
        manual: data?.manual,
        matricula: data?.matricula
    },);

});
app.get("/all", async function(res,res){
    const response = await prisma.price.findMany();
    res.json({response})
})
// /Listen do serer/
app.listen(3000,function(){
    console.log("tudo ok 3000");
})