/*
* Title : Ingenvs Server
* Author : Alexia Souvane et Julie Hardy
* Date : 07/01/2017 (fr)
*/


/*    REQUIRED MODULES      */
var express = require("express");   // to create web server
var bodyParser = require("body-parser");  // to parse html
var fs      = require("fs");        // to read/write in file
var db = require("seraph")({
	user: 'neo4j',
	pass: 'felix'
});





/*    SOME MODULE SETTINGS      */
// Instanciate an object express
var server = express(); 
// Use parsing module
server.use(bodyParser.urlencoded({ extended: false }));
// Read database
var cypher = "MATCH (n:Disease) RETURN n";

var data = { "disease" : [] };
db.query(cypher, {id: 1}, function(err, result) {
  if (err) throw err;

  for(d = 0 ; d < result.length ; d++){
  	var tmp = {}; tmp["id"] = d; tmp["name"] = result[d]["name"];
  	data["disease"].push(tmp);
  }

  json = JSON.stringify(data);
  fs.writeFile('public/interface/diseaseData.json', json, 'utf8');

});





/*    ROUTAGE      */
server.use('/', express.static(__dirname + "/public/home/"));
server.use('/interface', express.static(__dirname + "/public/interface"));
server.post('/graph', function(req, res, next){
	var disease = req.body.choice_disease; 

  res.render("test", {test:req.test});  

  res.redirect("/interface")
});



// Create server
server.listen(3000, function () {
  console.log('listening on port 3000!');
});
