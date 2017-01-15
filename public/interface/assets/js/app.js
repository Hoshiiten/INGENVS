var app = angular.module("diseaseGraph", []); 

'use strict';

app.controller('graph', ['$scope', '$http', function($scope, $http) {

    $scope.inserted = false;


    $http.get("graphData.json").then(function(response) {
      $scope.diseaseData = {
        model: null,
        allDiseases: response.data.nodes
        };

    });


    $scope.showGraph = function () {

      $scope.inserted = true;

      $http.get("data.json").then(function(response) {
        var diseaseName = $scope.disease;
        $scope.tissu = response.data.disease[diseaseName].tissu;
        $scope.omimId = response.data.disease[diseaseName].omimId;
        $scope.id = response.data.disease[diseaseName].id;
        $scope.name = diseaseName;
      });

    }



 }]);


/*
    $scope.sendDisease = function () {
            var choosenDisease = $scope.disease;

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/interface', choosenDisease, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });

    

    };
    
    
    $scope.gene = {
     model: null,
     availableOptions: [
       {id: '1', name: 'gene 1'},
       {id: '2', name: 'gene 2'},
       {id: '3', name: 'gene 3'}
     ]
    };


*/
