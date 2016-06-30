todoApp.directive('todoCheck', function() {
		return {
			restrict: "E",
            transclude: true,
            scope: {
              todoInfo: '=info'
            },
            template: '<input class="toggle" type="checkbox" ng-model="todoInfo.completed" ng-change="toggleCompleted(todoInfo)">'
		};
	});