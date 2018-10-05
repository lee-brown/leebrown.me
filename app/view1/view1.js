'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });  
}])

.controller('View1Ctrl',['$scope','$interval', '$timeout', function($scope,$interval,$timeout) {

  /* Switches from one image to another, and when one image is hidden its image is changed, this process repeats 
  Resources used:
  https://mdn.mozillademos.org/files/3469/no-dimensions-or-ratio.svg
  https://uigradients.com/
  https://yoksel.github.io/url-encoder/
  */
  var colors = [
    "style='stop-color: %238360c3;' offset='0'/%3E%3Cstop style='stop-color: %232ebf91;' ",
    "style='stop-color: %23dd3e54;' offset='0'/%3E%3Cstop style='stop-color: %236be585;' ",
    "style='stop-color: %23DA4453;' offset='0'/%3E%3Cstop style='stop-color: %2389216B;' ",
    "style='stop-color: %2311998e;' offset='0'/%3E%3Cstop style='stop-color: %2338ef7d;' ",
    "style='stop-color: %23108dc7;' offset='0'/%3E%3Cstop style='stop-color: %23ef8e38;' ",
    "style='stop-color: %23FC5C7D;' offset='0'/%3E%3Cstop style='stop-color: %236A82FB;' ",
    "style='stop-color: %23ff9966;' offset='0'/%3E%3Cstop style='stop-color: %23ff5e62;' ",
    "style='stop-color: %23CB356B;' offset='0'/%3E%3Cstop style='stop-color: %23BD3F32;' ",
    "style='stop-color: %231D4350;' offset='0'/%3E%3Cstop style='stop-color: %23A43931;' ",
    "style='stop-color: %23FF5F6D;' offset='0'/%3E%3Cstop style='stop-color: %23FFC371;' ",
    "style='stop-color: %23D53369;' offset='0'/%3E%3Cstop style='stop-color: %23CBAD6D;' ",
    "style='stop-color: %235C258D;' offset='0'/%3E%3Cstop style='stop-color: %234389A2;' ",
    "style='stop-color: %23134E5E;' offset='0'/%3E%3Cstop style='stop-color: %2371B280;' ",
    "style='stop-color: %233CA55C;' offset='0'/%3E%3Cstop style='stop-color: %23B5AC49;' ",
  ];
  var getNewColor = function(current){
    var rng = Math.floor(Math.random()*colors.length);
    if(current != undefined){ //Undefined when previous colour doesnt exist (initial colours)
      while(rng == current.index){ //Simple (but inefficient) way to prevent duplicates 
        rng = Math.floor(Math.random()*colors.length);
      }
    }
    return {
      color:colors[rng],
      index:rng
    };
  }
  var color1 = getNewColor(); //Gradient 1 (image1)
  var color2 = getNewColor(); //Gradient 2 (image2)
  var ChangeValues = function(opa){
    $scope.generatedColor = {
    kms:{backgroundImage: "url(" + '"' + "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3ECorner-to-corner gradient%3C/title%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' x2='100%25' y1='0%25' y2='100%25'%3E%3Cstop " + color1.color  + "offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect style='fill: url(%23g);' width='100%25' height='100%25'/%3E%3C/svg%3E" + '"' + ")", opacity: opa},
  }}
  var ChangeValues2 = function(opa){
    $scope.generatedColor2 = {
    kms:{backgroundImage: "url(" + '"' + "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3ECorner-to-corner gradient%3C/title%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' x2='100%25' y1='0%25' y2='100%25'%3E%3Cstop " + color2.color  + "offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect style='fill: url(%23g);' width='100%25' height='100%25'/%3E%3C/svg%3E" + '"' + ")", opacity: opa},
  }}
  var update1 = function(){ //Updates image 1
    $timeout(function() { //Timeout to reduce amount of white during transition
      ChangeValues2(0);
    }, 500);
    ChangeValues(1);
    $timeout(function() { //Prevents colours changing during transition
      color2 = getNewColor(color2);
    }, 1000);
  }
  var update2 = function(){ //updates image 2
    $timeout(function() {//Timeout to reduce amount of white during transition
      ChangeValues(0);
      }, 500);
      ChangeValues2(1);
      $timeout(function() { //Prevents colours changing during transition
        color1 = getNewColor(color1);
    }, 1000);
  }
  update1();
  $timeout(function() {
    update2();
  }, 5000);
  $interval(function(){
      update1();
  }, 10000)
  $interval(function(){
    $timeout(function() {
      update2();
    }, 5000);
  }, 10000)
}]);