'use strict'
var express = require('express');
var router = express.Router();
//HomePage
router.get('/', function(req, res, next){
    res.render('index', {title: 'Pagina de Inicio'});

});
module.exports = router; 