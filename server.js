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
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));



/*  READ DATABASE   */
var graphData = {"nodes" : [] , "links" : [] };
var data = { "disease" : {} };

var cypherDiseaseNode = "MATCH (n:Disease) RETURN n";
//var cypherDiseaseNode = "MATCH (n:DG {disease:'002', seed:True})-[:INTERACT_WITH*1..]-(neighbors) RETURN n, collect(DISTINCT neighbors)"

db.query(cypherDiseaseNode, {id: 1}, function(err, result) {
  if (err) throw err;

  for(d = 0 ; d < result.length ; d++){
    var tmp = {}; tmp["id"] = result[d]["id"]; tmp["name"] = result[d]["name"];
    graphData["nodes"].push(tmp);

    var tmp2 = { "tissu" : result[d]["tissu"], "omimId" : result[d]["omimId"], "id" : result[d]["id"] }
    data["disease"][result[d]["name"]] = tmp2;
  }

  json2 = JSON.stringify(data);
  fs.writeFile('public/interface/data.json', json2, 'utf8');


  var cypherDiseaseLink = "MATCH ()-[r:SIMILAR_TO]->() RETURN r";
  db.query(cypherDiseaseLink, {id: 1}, function(err, result) {
  if (err) throw err;

  for(d = 0 ; d < result.length ; d++){
    var tmp = {}; tmp["source"] = result[d]["start"]; tmp["target"] = result[d]["end"]; tmp["value"] = 1 /*result[d]["properties"]*/;
    graphData["links"].push(tmp);
  }

  json = JSON.stringify(graphData);
  fs.writeFile('public/interface/graphData.json', json, 'utf8');
  

  });

});




  



/*    ROUTAGE      */
server.use('/', express.static(__dirname + "/public/home/"));
server.use('/interface', express.static(__dirname + "/public/interface"));
server.post('/interface', function(req, res, next){
    var disease = req.body.diseaseId;
    var cypherDiseaseNode = "MATCH (n:DG {disease:'"+disease+"', seed:True})-[:INTERACT_WITH*1..]-(neighbors) RETURN n, collect(DISTINCT neighbors) AS p";

    var graphData = {"nodes" : [] , "links" : [] };

    db.query(cypherDiseaseNode, {id: 1}, function(err, result) {
      if (err) throw err;

      var seed = result[0]["n"];
      var neigh = result[0]["p"];

      graphData["nodes"].push( { "id" : seed["id"] , "name" : seed["gene"] } );

      for(d = 0 ; d < result[0]["p"].length ; d++){
        var tmp = {}; tmp["id"] = neigh[d]["id"]; tmp["name"] = neigh[d]["gene"];
        graphData["nodes"].push(tmp);
      }

    var cypherDiseaseLink = "MATCH (:DG {disease:'"+disease+"', seed:True})-[r:INTERACT_WITH*1..]-(neighbors) RETURN r";
    db.query(cypherDiseaseLink, {id: 1}, function(err, result) {
      if (err) throw err;

      for(d = 0 ; d < result.length ; d++){
        var tmp = {}; tmp["source"] = result[d][0]["start"]; tmp["target"] = result[d][0]["end"]; tmp["value"] = 1 /*result[d]["properties"]*/;
        graphData["links"].push(tmp);
      }

      json = JSON.stringify(graphData);
      fs.writeFile('public/interface/graphData.json', json, 'utf8');

    });

});

res.redirect("/interface");

});



// Create server
server.listen(3000, function () {
  console.log('listening on port 3000!');
});
