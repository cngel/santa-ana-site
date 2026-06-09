const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const islogin = require("./midellweres/isLogin");
router.get("/",function(req,res){
    res.sendFile("index.html");
});

//rota de precos, para a unca pagina dinamica. a unica dinamica


//rota para aceder ao painel preciso a proteger
router.get("/novela", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});



router.post("/post/price", async function(req, res) {
    const { email, senha } = req.body;
    if(!(email == process.env.EMAIL && await bcrypt.compare(senha,process.env.PASSWORD)) ){
        return res.json({message:'dados incorretos'});
    }
    try {

        const data = await prisma.price.update({
            where: {
                id: 1 // ou o id fixo do sistema
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
router.get("/preco", async function(req,res){

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
router.get("/all", async function(res,res){
    const response = await prisma.price.findMany();
    res.json({response})
})
    


module.exports = router;