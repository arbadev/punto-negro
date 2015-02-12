'use strict';

angular.module('puntoNegro')
  .controller('MainCtrl', function($scope, $http){

    // generadores disponibles
    $scope.generators = [
      { name: 'L\'Ecuyer' }
    ]

    // valores por defecto
    $scope.seed = 1;
    $scope.generator = $scope.generators[0];

    //
    $scope.isLoadding = false;
    $scope.isShowData = false;

    // tabla y grafica
    $scope.tables = {};
    $scope.chart = {};

    /**
     * funcion que hace la peticion al servidor para que simule los datos
     */
    $scope.simulate = function(form) {

      if (form.$valid) {
        $scope.isLoadding = true;

        $http.get('http://punto-negro-api.herokuapp.com/simulator/'+$scope.seed)
          .success(function(data) {
            console.log('success');
            console.log(data);
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
                "pointSize": 3,
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                  "title": "Et"
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
