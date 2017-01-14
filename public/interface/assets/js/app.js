var app = angular.module("diseaseGraph", []); 

'use strict';

app.controller('graph', ['$scope', '$http', function($scope, $http) {

    $http.get("diseaseData.json").then(function(response) {
      //document.write(response.data.links)
      $scope.maladie = {
        model: null,
        availableOptions: response.data.nodes
        };

    });
    
    $scope.gene = {
     model: null,
     availableOptions: [
       {id: '1', name: 'gene 1'},
       {id: '2', name: 'gene 2'},
       {id: '3', name: 'gene 3'}
     ]
    };

 }]);


