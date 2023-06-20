const express = require('express')
const config = require('./config')

const app = express();
const port = config.serverPort;

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

//Va recibir el login de moddle q se guarda en el usuario
app.post('/login',async function(request, response){

});

app.get('/items',async function(request, response){
    
});