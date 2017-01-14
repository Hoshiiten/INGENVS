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
  user: process.argv[2],
  pass: process.argv[3]
});





/*    SOME MODULE SETTINGS      */
// Instanciate an object express
var server = express(); 
// Use parsing module
server.use(bodyParser.urlencoded({ extended: false }));

// Read database
var data = {"nodes" : [] , "links" : []}

var cypherDiseaseNode = "MATCH (n:Disease) RETURN n";
db.query(cypherDiseaseNode, {id: 1}, function(err, result) {
  if (err) throw err;

  console.log(result)

  for(d = 0 ; d < result.length ; d++){
    var tmp = {}; tmp["id"] = d.toString(); tmp["name"] = result[d]["name"];
    data["nodes"].push(tmp);
  }

  json = JSON.stringify(data);
  fs.writeFile('public/interface/diseaseData.json', json, 'utf8');

});


/*
{"nodes":[
    {"id": "Ludo", "group": 1},
    {"id": "Savy", "group": 1},
    {"id": "Alexia", "group": 2},
    {"id": "Julie", "group":2},
    {"id": "Fatou", "group":3},
    {"id": "Alexandre", "group":3},
    {"id": "BDD", "group":4},
    {"id": "SERVER", "group":5},
    {"id": "INTERFACE","group":6}
],
"links":[
    {"source": "INTERFACE", "target": "SERVER", "value": 3},
    {"source": "BDD", "target": "SERVER", "value": 3},
    {"source": "Ludo", "target": "BDD", "value": 2},
    {"source": "Savy", "target": "BDD", "value": 2},
    {"source": "Alexia", "target": "SERVER", "value": 2},
    {"source": "Julie", "target": "SERVER", "value": 2},
    {"source": "Fatou", "target": "INTERFACE", "value": 2},
    {"source": "Alexandre", "target": "INTERFACE", "value": 2}
]
}
*/

var cypherDiseaseLink = "MATCH ()-[r:SIMILAR_TO]->() RETURN r";
db.query(cypherDiseaseLink, {id: 1}, function(err, result) {
  if (err) throw err;

  for(d = 0 ; d < result.length ; d++){
    var tmp = {}; tmp["source"] = result[d]["start"]; tmp["target"] = result[d]["end"]; tmp["value"] = 1 /*result[d]["properties"]*/;
    data["links"].push(tmp);
  }

  json = JSON.stringify(data);
  fs.appendFile('public/interface/diseaseData.json', json, 'utf8');


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
