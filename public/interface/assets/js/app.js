var app = angular.module("diseaseGraph", []); 

'use strict';

app.controller('graph', ['$scope', '$http', function($scope, $http) {

    $scope.inserted = false;

    var diseaseList = [];

    $http.get("data.json").then(function(response) {
      var disease = response.data.disease;
      diseaseKeys = Object.keys(disease);

      for(i = 0 ; i < diseaseKeys.length ; i++) {
        diseaseList.push( { "name" : diseaseKeys[i] , "id" : diseaseKeys[i]["id"] } )
      }

      $scope.diseaseData = {
        model: null,
        allDiseases: diseaseList
        };
    });


    $scope.showGraph = function () {

      $scope.inserted = true;

      $http.get("data.json")
        .then(function(response) {

          var diseaseName = $scope.disease;

          $scope.tissu = response.data.disease[diseaseName].tissu;
          $scope.omimId = response.data.disease[diseaseName].omimId;
          $scope.id = response.data.disease[diseaseName].id;
          $scope.name = diseaseName;


      }).then(function(response){

        var data = { diseaseId : $scope.omimId }

        $http.post('/interface', data);




      }).then(function(response){

        $http.get("graphData.json").then(function(response) {
        $scope.diseaseData = {
        model: null,
        allDiseases: response.data.nodes
        };
        
        });

        //$("#page-wrapper").load(location.href+#page-wrapper>*,);
        //$("#graph").load(location.href+" #page-wrapper>*,");
        $scope.reloadPage = function(){window.location.reload();}
        $scope.reloadPage();

      });

    $scope.$watch('diseaseData', function() {

    });

    }

 }]);


 



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
