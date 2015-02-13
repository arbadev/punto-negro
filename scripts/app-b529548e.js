"use strict";angular.module("puntoNegro",["ui.bootstrap","googlechart"]),angular.module("puntoNegro").controller("MainCtrl",["$rootScope","$scope","$http",function(t,e,a){e.generators=[{name:"L'Ecuyer"}],e.generator={},e.generator.seed=1,e.generator.generator=e.generators[0],e.isLoadding=!1,e.isShowData=!1,e.tables={},e.chart={},e.simulate=function(t){t.$valid&&(e.isLoadding=!0,console.log("seed: "+e.generator.seed),a.get("http://punto-negro-api.herokuapp.com/simulator/"+e.generator.seed).success(function(t){console.log("success"),console.log(t),e.isShowData=!0,e.isLoadding=!1,e.promEt=t.prom,e.tables=t.tables;var a=new Array;t.tables.forEach(function(t){a.push({c:[{v:t.N,f:"N: "+t.N},{v:t.Et}]})}),console.log(a),e.chart={type:"LineChart",displayed:!0,options:{pointSize:3,isStacked:"true",fill:20,displayExactValues:!0,vAxis:{title:"Et"},hAxis:{title:"Iteraciones"}},formatters:{},data:{cols:[{id:"prom",label:"Promedio",type:"number",p:{}},{id:"fet",label:"F(Et)",type:"number",p:{}}],rows:a}}}).error(function(){console.log("error"),e.isLoadding=!1,alert("Semilla Invalida")}))}}]),angular.module("puntoNegro").run(["$templateCache",function(t){t.put("app/main/content.tpl.html",'<section ng-controller="MainCtrl"><div ng-include="\'app/main/content/form.tpl.html\'"></div><div ng-show="isShowData" ng-include="\'app/main/content/results.tpl.html\'"></div></section>'),t.put("app/main/footer.tpl.html",'<footer class="row"><hr><p><span class="fa fa-copyright"></span> Estudios y casos de simulación 2015 - UNEG<br><a href="https://github.com/cjose3/punto-negro">Alojado en <span class="fa fa-github fa-2x"></span></a> - Licencia Apache 2</p></footer>'),t.put("app/main/header.tpl.html",'<header class="row"><div class="col-xs-12"><p><img src="assets/images/logo_uneg.svg" alt=""><br></p><p><span class="title">Esperanza de números aleatorios</span><br></p></div></header>'),t.put("app/main/content/form.tpl.html",'<div class="row"><div class="col-md-6 col-md-offset-3"><form class="form-inline" name="form" ng-submit="simulate(form)" novalidate=""><fieldset ng-disabled="isLoadding"><div class="form-group" ng-class="{"has-error": form.generator.$invalid }"><label for="generator">Generador</label><select name="generator" ng-model="generator.generator" required="" class="form-control" ng-options="generator.name for generator in generators"></select></div><div class="form-group" ng-class="{"has-error": form.seed.$invalid }"><label for="seed">Semilla</label> <input name="seed" ng-model="generator.seed" required="" type="number" class="form-control"></div><div class="form-group"><button type="submit" class="btn btn-default">Simular</button></div></fieldset></form></div></div>'),t.put("app/main/content/results.tpl.html",'<div class="row"><h3>Promedio de Et: <span>{{ promEt | number:5 }}</span></h3></div><div class="row"><tabset justified="true"><tab heading="Gráfica"><div google-chart="" chart="chart"></div></tab><tab heading="Tablas"><div class="row" ng-repeat="table in tables"><table class="table"><thead><tr class="active"><th colspan="4">N: {{ table.N }}</th></tr><tr><td>X</td><td>Fx</td><td>P(x)</td><td>Ex</td></tr></thead><tbody><tr ng-repeat="row in table.rows"><td>{{ row.x }}</td><td>{{ row.fx }}</td><td>{{ row.px | number:5 }}</td><td>{{ row.ex | number:5 }}</td></tr></tbody><tfoot><tr><th colspan="3"></th><th class="info">Et: {{ table.Et | number:5 }}</th></tr></tfoot></table></div></tab></tabset></div>')}]);