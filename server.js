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
var data = { "disease" : {} , "genes" : {} };

// Here we send a request to the database to return all the disease nodes and relation
// First request is for getting nodes
var cypherDiseaseNode = "MATCH (n:Disease) RETURN n";
db.query(cypherDiseaseNode, {id: 1}, function(err, result) {
  if (err) throw err;

  // We build the json files that will contain the needed information for the view
  for(d = 0 ; d < result.length ; d++){
    var tmp = {}; tmp["id"] = result[d]["id"]; tmp["name"] = result[d]["name"];
    graphData["nodes"].push(tmp);

    var tmp2 = { "tissu" : result[d]["tissu"], "omimId" : result[d]["omimId"], "id" : result[d]["id"] }
    data["disease"][result[d]["name"]] = tmp2;
  }

  var cypherGeneNode = "MATCH (n:Gene) RETURN n";
  db.query(cypherGeneNode, {id: 1}, function(err, result) {
    //console.log(result)

    for(d = 0 ; d < result.length ; d++){
      var tmp = {}; tmp["entrezId"] = result[d]["entrezId"];
      data["genes"][result[d]["id"]] = tmp;
    }

    // We write the information on a json file
    json2 = JSON.stringify(data);
    fs.writeFile('public/interface/data.json', json2, 'utf8');

    // Another request for getting relation between nodes
    var cypherDiseaseLink = "MATCH ()-[r:SIMILAR_TO]->() RETURN r";
    db.query(cypherDiseaseLink, {id: 1}, function(err, result) {
    if (err) throw err;

    // Build the json format
    for(d = 0 ; d < result.length ; d++){
      var tmp = {}; tmp["source"] = result[d]["start"]; tmp["target"] = result[d]["end"]; tmp["value"] = 1 /*result[d]["properties"]*/;
      graphData["links"].push(tmp);
    }

    // Write the json file
    json = JSON.stringify(graphData);
    fs.writeFile('public/interface/graphData.json', json, 'utf8');
    
    });

  });

});




  



/*    ROUTAGE      */
server.use('/', express.static(__dirname + "/public/home/"));
server.use('/interface', express.static(__dirname + "/public/interface"));
// When a disease is selected, server will execute this function, that is rebuilding the json file 
// that will contain the element for used for the new graph
server.post('/graph', function(req, res, next){
    var disease = req.body.diseaseId;
    var cypherDiseaseNode = "MATCH (n:DG {disease:'"+disease+"', seed:True})-[:INTERACT_WITH*1..]-(neighbors) RETURN n, collect(DISTINCT neighbors) AS p";

    var graphData = {"nodes" : [] , "links" : [] };

    db.query(cypherDiseaseNode, {id: 1}, function(err, result) {
      if (err) throw err;


      var seed = result[0]["n"];
      var neigh = result[0]["p"];


      //for(d = 0 ; d < result[0]["n"].length ; d++){
        graphData["nodes"].push( { "id" : seed["id"] , "name" : seed["gene"] } );
    
      //}

      for(d = 0 ; d < result[0]["p"].length ; d++){
        var tmp = {}; tmp["id"] = neigh[d]["id"]; tmp["name"] = neigh[d]["gene"];
        graphData["nodes"].push(tmp);
        console.log(neigh[d]["id"])


        db.relationships(neigh[d]["id"],'all', 'INTERACT_WITH', function(err, relationships){
        
          console.log(relationships)

          for (var i = 0 ; i < relationships.length ; i++)
          {
            var tmp = {}; tmp["source"] = relationships[i]["start"]; tmp["target"] = relationships[i]["end"]; tmp["value"] = 1;
            graphData["links"].push(tmp);

    json = JSON.stringify(graphData);
    fs.writeFile('public/interface/graphData.json', json, 'utf8');
    
          }

       });

      }

    })



/*

    var cypherDiseaseLink = "MATCH (:DG {disease:'"+disease+"', seed:True})-[r:INTERACT_WITH*1..]-(neighbors) RETURN r";
    db.query(cypherDiseaseLink, function(err, result) {
      if (err) throw err;


      for(d = 0 ; d < result[1].length ; d++){
        var tmp = {}; tmp["source"] = result[1][d]["start"]; tmp["target"] = result[1][d]["end"]; tmp["value"] = 1;
        graphData["links"].push(tmp);
      }

      json = JSON.stringify(graphData);
      fs.writeFile('public/interface/graphData.json', json, 'utf8');

    });

    */



res.redirect("/interface");

});


server.post('/diseases', function(req, res, next){
    var gene = req.body.geneId;
    diseaseData = {};
    diseaseData["data"] = [];


    var cypherGeneDiseases = "MATCH (n:Gene {entrezId:'"+ gene +"'}) - [*2]-(d:Disease) return d";

    db.query(cypherGeneDiseases, {id: 1}, function(err, result) {
      if (err) throw err;

      for(d = 0 ; d < result.length ; d++){
        diseaseData["data"].push( result[d]["name"] );
      }

      json = JSON.stringify(diseaseData);
      fs.writeFile('public/interface/diseaseData.json', json, 'utf8');


    });

res.redirect("/interface");


});




/*    CREATE SERVER      */
server.listen(3000, function () {
  console.log('listening on port 3000!');
});
