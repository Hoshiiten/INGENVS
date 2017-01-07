/*
* Title : Ingenvs Server
* Author : Alexia Souvane et Julie Hardy
* Date : 07/01/2017 (fr)
*/


// Insert required modules 
var express = require("express");   // to create web server
//var fs      = require("fs");        // to read/write in file


// Instanciate an object express
var app = express(); 


// Routage
app.use('/', express.static(__dirname+"/public"));
app.get('/network', function(req, res){





});



// Create server
app.listen(3000, function () {
  console.log('listening on port 3000!');
});
