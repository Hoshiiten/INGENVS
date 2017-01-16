var app = angular.module("diseaseGraph", []); 

'use strict';


// Controller Definition
app.controller('graph', ['$scope', '$http', function($scope, $http) {


    // This variable is used to hide or show description div
    $scope.inserted = false;

    // This list will contain diseases present in the diseases network
    var diseaseList = [];

    // Here we parse the data.json file to fill out diseaseList 
    $http.get("data.json").then(function(response) {
      var disease = response.data.disease;
      diseaseKeys = Object.keys(disease);

      for(i = 0 ; i < diseaseKeys.length ; i++) {
        diseaseList.push( { "name" : diseaseKeys[i] , "id" : diseaseKeys[i]["id"] } )
      }

      // This scope contains the diseaseList to show to the user in the select html balise
      $scope.diseaseData = {
        model: null,
        allDiseases: diseaseList
        };
    });


    // Here we define a new function called when user choose a disease newtwork to show
    $scope.showGraph = function () {

      // This variable is used to hide or show description div
      $scope.inserted = true;


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
        $http.post('/interface', data);

        // Reload the whole page...
        //$scope.reloadPage = function(){window.location.reload();}
        //$scope.reloadPage();

        //$("#page-wrapper").load(location.href+#page-wrapper>*,);
        $("#graph").load(location.href+" #graph", function(){
            $.getScript("visu.js"); 
        });

        //$("#graph").load("<script src='visu.js'></script>");

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
