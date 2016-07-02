angular.module('todoApp').directive('todoDelete', function(todoFactory) {
    return {
        restrict: "E",
        transclude: true,
        scope: {
          todoChange: '&'
        },
        templateUrl: 'todoDeleteTemplate.html'
    };
});
