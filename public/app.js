(function(angular) {
  'use strict';
angular.module('ngrepeatSelect', [])
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.maladie = {
     model: null,
     availableOptions: [
       {id: '1', name: 'maladie 1'},
       {id: '2', name: 'maladie 2'},
       {id: '3', name: 'maladie 3'}
     ]
    };

    $scope.gene = {
     model: null,
     availableOptions: [
       {id: '1', name: 'gene 1'},
       {id: '2', name: 'gene 2'},
       {id: '3', name: 'gene 3'}
     ]
    };
 }]);
})(window.angular);
