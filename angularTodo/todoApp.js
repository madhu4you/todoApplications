(function(angular) {	
	angular.module("todoApp", ['ui.grid', 'ui.grid.pagination', 'ui.grid.draggable-rows', 'ui.grid.edit', 'ui.router'])
	    .config(function($stateProvider, $urlRouterProvider){
	      
	      // For any unmatched url, send to /all
	      $urlRouterProvider.otherwise("/")
	      
	      $stateProvider
	        .state('all', {
	            url: "/"
	        })
	        .state('active', {
	            url: "/active"
	        })
	        .state('completed', {
	            url: "/completed"
	        })
	    });
})(window.angular);