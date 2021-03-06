'use strict';

angular.module('puntoNegro')
  .run(function($anchorScroll) {
    $anchorScroll.yOffset = 90;
  })
  .controller('MainCtrl', function($rootScope, $scope, $http, $modal, $location, $anchorScroll){

    // generadores disponibles
    $scope.generators = [
      { name: 'L\'Ecuyer' }
    ]

    $scope.generator = {};

    // valores por defecto
    $scope.generator.seed = 1;
    $scope.generator.generator = $scope.generators[0];

    //
    $scope.isLoadding = false;
    $scope.isShowData = false;

    // tabla y grafica
    $scope.tables = {};
    $scope.chart = {};

    /**
     * funcion que abre el modal con la l
     */
    $scope.openLeyenda = function () {
      $modal.open({
        templateUrl: 'modalLeyenda.html'
      });
    };

    /**
     * funcion que hace la peticion al servidor para que simule los datos
     */
    $scope.simulate = function(form) {

      if (form.$valid) {
        $scope.isLoadding = true;

        console.log('seed: ' + $scope.generator.seed);

        $http.get('http://punto-negro-api.herokuapp.com/simulator/' + $scope.generator.seed)
          .success(function(data) {
            $location.path('/');
            // this callback will be called asynchronously
            // when the response is available
            $scope.isShowData = true;
            $scope.isLoadding = false;

            // Promedio de los Et
            $scope.promEt = data.prom;

            // Variables para contruir la tabla
            $scope.tables = data.tables;

            var rows = new Array();
            data.tables.forEach(function(table) {
              rows.push({
                'c': [
                  {
                    'v': table.N,
                    'f':'N: ' + table.N
                  },
                  {
                    'v': table.Et
                  }
                ]
              });
            });

            console.log(rows);

            $scope.chart = {
              "type": "LineChart",
              "displayed": true,
              "options": {
                "pointSize": 4,
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                  "title": "Et",
                  "viewWindow":{
                    "max":5,
                    "min":0
              }
                },
                "hAxis": {
                  "title": "Iteraciones"
                }
              },
              "formatters": {},
              "data": {
                "cols": [
                  {
                    "id": "prom",
                    "label": "Promedio",
                    "type": "number",
                    "p": {}
                  },
                  {
                    "id": "fet",
                    "label": "F(Et)",
                    "type": "number",
                    "p": {}
                  }
                ],
                "rows": rows
              }
            };

          $location.hash('results');
          $anchorScroll();
          })
          .error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error');
            $scope.isLoadding = false;

            alert('Semilla Invalida');
          });
      }
    };
  });
