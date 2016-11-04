angular.module('todoApp').directive('todoCheck', function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {
          todoInfo: '=info',
          toggleCheck: "&" 
        },
        templateUrl: "todoCheckTemplate.html"
    };
});