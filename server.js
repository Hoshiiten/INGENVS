/*
* Title : Ingenvs Server
* Author : Alexia Souvane et Julie Hardy
* Date : 07/01/2017 (fr)
*/


// Insert required modules 
var express = require("express");   // to create web server
var bodyParser = require("body-parser");
//var fs      = require("fs");        // to read/write in file


// Instanciate an object express
var app = express(); 
// Use parsing module
app.use(bodyParser.urlencoded({ extended: true }));



// Routage
app.use('/', express.static(__dirname+"/public"));
app.post('/network', function(req, res){
	var disease = req.body.choice_disease; 
    console.log(disease);
    response.sendFile( __dirname  + '/public');	




});



// Create server
app.listen(3000, function () {
  console.log('listening on port 3000!');
});
