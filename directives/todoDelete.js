todoApp.directive('todoDelete', ['todoFactory', function(todoFactory) {
		return {
			restrict: "E",
            transclude: true,
            scope: {
              todoInfo: '=info'
            },
            controller: function ($scope) {
                $scope.removeTodo = function (todoInfo) {
                    todoFactory.delete(todoInfo);
                };
            },
            template: '<button class="destroy" ng-click="removeTodo(todoInfo)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>'
		};
	}]);
