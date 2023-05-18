'use strict';
const http = require('http');
var express = require('express');
const fs = require("fs");
const DAL = require('./DAL');
const userLogic = require('./logics/userLogic');
const config = require("./config");
const { resolve } = require('path');
module.exports = class Server{
    constructor(){
        this.app = null;
    }

    startServer(){
        this.app=express();
    }
}


app.get('/', function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  let index = fs.readFileSync("index.html").toString();
  res.end(index);
  
});

app.post('/login', function (req, res) {
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('aca en login');
  let user ;
  console.log('POST /')
  req.on('data',function (data) {
    debugger;
    let body = JSON.parse(data.toString());
    console.log(JSON.parse(data.toString()))
    userLogic.login(body.username,body.password).then((resolve,reject)=>{
      res.end("logeuadou")
    });

  });

});

app.post('/register', function (req, res) {
  req.on('data',function (data) {
    debugger;
    let body = JSON.parse(data.toString());
    console.log(JSON.parse(data.toString()))
    userLogic.register(body.username,body.password).then((resolve,reject)=>{
      res.end("register")
    });

  });
});

var server = app.listen(config.server.port,config.server.hostname, function () {
  DAL.initializeDataBase();
  console.log('Server is running...');
});
