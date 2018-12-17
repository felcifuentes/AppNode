var express = require('express');
var app = express();
//rutas
var index = require('./routes/index');
var usuarios = require ('./routes/usuarios');
//users
app.use('/usuarios', usuarios);
var server = app.listen(5000, function() {
	console.log('Server is running..');
}); 