angular.module("todoApp", ['ui.grid', 'ui.grid.pagination', 'ui.grid.draggable-rows', 'ui.grid.edit', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
      
      // For any unmatched url, send to /all
      $urlRouterProvider.otherwise("/")
      
      $stateProvider
        .state('all', {
            url: "/",
            templateUrl: "todo-grid.html",
        })
        .state('active', {
            url: "/active",
            templateUrl: "todo-grid.html",
        })
        .state('completed', {
            url: "/completed",
            templateUrl: "todo-grid.html",
        })
    })