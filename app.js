'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var mssql = require('mssql');
var http = require('http');
var path = require('path');
var app = express();
//rutas
var index = require('./routes/index');
var usuarios = require ('./routes/usuarios');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//usar index
app.use('/', index);
//users
app.use('/usuarios', usuarios);
module.exports = app;