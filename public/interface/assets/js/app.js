var app = angular.module("diseaseGraph", []); 

'use strict';

app.controller('graph', ['$scope', '$http', function($scope, $http) {

    $http.get("diseaseData.json").then(function(response) {
      $scope.maladie = {
        model: null,
        availableOptions: response.data.disease
        };


        //$scope.maladie = response.data.disease;
        //document.write(response.data.disease);
    });


    
/*
    $scope.maladie = {
     model: null,
     availableOptions: [
       {id: '1', name: 'maladie 1'},
       {id: '2', name: 'maladie 2'},
       {id: '3', name: 'maladie 3'}
     ]
    };
*/
    $scope.gene = {
     model: null,
     availableOptions: [
       {id: '1', name: 'gene 1'},
       {id: '2', name: 'gene 2'},
       {id: '3', name: 'gene 3'}
     ]
    };

 }]);


