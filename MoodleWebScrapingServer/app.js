const express = require('express')
const multer = require("multer");
const cors = require("cors");
const bodyParser = require('body-parser')

const controller = require("./services/fileService");
const config = require('./config')
const WebScrapingLogic = require('./Logics/WebScrapingLogic')

const app = express();
const port = config.serverPort;
const router = express.Router();
const upload = multer({ dest: "uploads/" });

var corsOptions = {
        origin: `http://localhost:${config.serverPort}`
      };

app.use(cors(corsOptions));
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.post("/upload",upload.single("file"),(req,res)=>{
        console.log(req.body)
        console.log(req.file)
})
app.get("/files", controller.getListFiles)
app.get("/files/:name", controller.download)
app.post("/upload", controller.upload,(request,response)=>{
        console.log(request.body)
        console.log(request.file)
})

//Va recibir el login de moddle q se guarda en el usuario
app.post('/login',async function(request, response){

});

app.post('/items',async function(request, response){
        const username = request.body.username;
        const password = request.body.password;
        if(!username || !password){
            response.status(400).send("Moodle credentials required")
        }else{
                const loginData = {username:username,password:password};
                console.log("login data",loginData)
        
                let filter =null;
                const loginResponse =await new WebScrapingLogic().import(loginData,filter)
                console.log(loginResponse)
                response.send(loginResponse)
        }
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  