var app = angular.module("diseaseGraph", []); 

'use strict';


// Controller Definition
app.controller('graph', ['$scope', '$http', function($scope, $http) {

    // This variable is used to hide or show description div
    $scope.diseaseInserted = false

    // This list will contain diseases present in the diseases network
    var diseaseList = [];
    var geneList = [];

    // Here we parse the data.json file to fill out diseaseList and geneList
    $http.get("data.json").then(function(response) {


      var disease = response.data.disease;
      diseaseKeys = Object.keys(disease);
      for(i = 0 ; i < diseaseKeys.length ; i++) {
        diseaseList.push( { "name" : diseaseKeys[i] , "id" : diseaseKeys[i]["id"] } )
      }

      var gene = response.data.genes;
      geneKeys = Object.keys(gene);


      for(i = 0 ; i < geneKeys.length ; i++) {
        geneList.push( { "id" : geneKeys[i] , "name" : gene[geneKeys[i]]["entrezId"] } )
      }

      // This scope contains the diseaseList to show to the user in the select html balise
      $scope.diseaseData = {
        model: null,
        allDiseases: diseaseList
        };

      $scope.geneData = {
        model: null,
        allGenes: geneList
        };
    });




    // Here we define a new function called when user choose a disease newtwork to show
    $scope.showGraph = function () {

      // This variable is used to hide or show description div
      $scope.diseaseInserted = true;


      // Here we parse the data.json file to get information linked to a given disease
      $http.get("data.json")
        .then(function(response) {

          var diseaseName = $scope.disease;
          $scope.tissu = response.data.disease[diseaseName].tissu;
          $scope.omimId = response.data.disease[diseaseName].omimId;
          $scope.id = response.data.disease[diseaseName].id;
          $scope.name = diseaseName;


      // Then we send the choosen disease to the server
      }).then(function(response){

        // contains the id of the choosen disease
        var data = { diseaseId : $scope.omimId }

        // Send request to the server
        $http.post('/graph', data);

        // Reload the graph
        $("#graph").load(location.href+" #graph", function(){
            $.getScript("visu.js"); 
        });

      });

    }


    $scope.showRelatedDiseases = function() {

      $scope.geneInserted = true;

      var data = { geneId : $scope.gene }

      $http.post('/diseases', data);

      $http.get("diseaseData.json").then(function(response) {

        $scope.diseaseForOneGene = response.data.data;

      });



    }




 }]);


        /* IMPORTANT !!!
        $http.get("graphData.json").then(function(response) {
        $scope.diseaseData = {
        model: null,
        allDiseases: response.data.nodes
        };
        
        });
        */

 



/*   
    
    $scope.gene = {
     model: null,
     availableOptions: [
       {id: '1', name: 'gene 1'},
       {id: '2', name: 'gene 2'},
       {id: '3', name: 'gene 3'}
     ]
    };


*/
