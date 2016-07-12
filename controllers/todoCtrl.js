(function(angular) {
	angular.module('todoApp').controller("TodoCtrl", ['$scope', '$filter', '$stateParams', 'todoFactory', function ($scope, $filter, $stateParams, todoFactory) {
	        
	    var todos = $scope.todos = [];
	
	    //URL route
	    $scope.$on('$stateChangeStart', function (event, toState) {
	        var status = $scope.status = toState.name || '';
	        if (status === 'active') {
	             $scope.gridOptions.data = $filter('filter')(todos, { completed: false });
	        }
	        else if (status === 'completed') {
	             $scope.gridOptions.data = $filter('filter')(todos, { completed: true });
	        } 
	        else {
	            $scope.gridOptions.data = todos;   
	        }
	    });
	    
	    /* Grid options */
	    $scope.gridOptions = {
	        enableSorting: false,
	        showGridFooter: false,
	        paginationPageSizes: [10, 50, 100],
	        paginationPageSize: 10,
	        rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
	        columnDefs: [{ field: 'completed', enableCellEdit: false, displayName: '', enableColumnMenu: false, width: 30, cellTemplate: '<div class="ui-grid-cell-contents"><todo-check toggle-check="grid.appScope.toggleCompleted(row.entity)" info="row.entity"><todo-check></div>' },
	                     { field: 'title', displayName: 'Todos', enableColumnMenu: false, cellTemplate: '<div class="ui-grid-cell-contents" ><span class="done-{{row.entity.completed}}">{{row.entity.title}}</span></div>' },
	                     { field: 'action', displayName: 'Action', enableCellEdit: false, enableColumnMenu: false, width: 80, cellTemplate: '<div class="ui-grid-cell-contents" ><todo-delete todo-change="grid.appScope.removeTodo(row.entity)"><todo-delete></div></div>'} ]
	      };
	    
	    /* After drag and drop update the data */
	    $scope.gridOptions.onRegisterApi = function (gridApi) {
	        gridApi.draggableRows.on.rowDropped($scope, function (info, dropTarget) {
	
	        });
	        // edit the todo
	        gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
	            title = newValue.trim();
				if (title === oldValue) {
					return;
				}
				todoFactory[title ? 'put' : 'delete'](rowEntity)
	            .then(function success() {}, function error() {
	                todo.title = $scope.originalTodo.title;
	            });
	        });
	    };
	    /* Grid options end*/
	    
	    /* Watchers */
	    $scope.$watch('todos', function () {
	        $scope.getTotalTodos = todos.length;
	        $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
	        $scope.completedCount = todos.length - $scope.remainingCount;
	    }, true);
	    /* Watchers end */
	    
	    $scope.newTodo = '';
	    
	    /* Get all the todos*/
	    $scope.getAllTodos = function() {
	    	//get the stored todos
	        todoFactory.get()
	        .then(function(res){
	        	todos = $scope.todos = res;
	        	$scope.gridOptions.data = todos; 
	        }, function(err){
	        	// error msg
	        	console.log(err);
	        });
	    }
	    $scope.getAllTodos();
	    
	    /* Add Todo */
	    $scope.addTodo = function () {
	        var newTodo = {
	            title: $scope.newTodo.trim(),
	            completed: false
	        };
	
	        if (!newTodo.title) {
	            return;
	        }
	
	        todoFactory.insert(newTodo)
	        .then(function success() {
					$scope.newTodo = '';
	        }, function(err) {
	        	
	        });
	    };
	    
	    /* Remove Todo */
	    $scope.removeTodo = function (todo, id) {
	        todoFactory.deleteTodo(todo, id);
	    };
	    
	    /* Save Todo */
	    $scope.saveTodo = function (todo) {
	        todoFactory.put(todo);
	    };
	    
	    /* Complete Todo */
	    $scope.toggleCompleted = function (todo, completed) {
	        if (angular.isDefined(completed)) {
					todo.completed = completed;
				}
	        todoFactory.put(todo, todos.indexOf(todo))
	            .then(function success() {}, function error() {
	                todo.completed = !todo.completed;
	            });
	    };
	    
	    /* Cleared Completed Todo */
	    $scope.clearCompletedTodos = function () {
	        todoFactory.clearCompleted();
	    };
	        
	}]);
})(window.angular);