(function(angular) {
  'use strict';
	var myAppDev = angular.module('todoAppE2E', ['todoApp', 'ngMockE2E']);
	
	myAppDev.run(function($httpBackend) {
	  var todos = [{"id":1,"title":"AngularJSDirectives","completed":true},{"id":2,"title":"Databinding","completed":true},{"id":3,"title":"$scope","completed":true},{"id":4,"title":"ControllersandModules","completed":true},{"id":5,"title":"Templatesandroutes","completed":true},{"id":6,"title":"FiltersandServices","completed":false},{"id":7,"title":"GetstartedwithNode/ExpressJS","completed":false},{"id":8,"title":"SetupMongoDBdatabase","completed":false},{"id":9,"title":"Beawesome!","completed":false}];
	  var STORAGE_ID = 'todos-storage-local';
	  
	  //get the data from storage
	  var todosStorageData = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
	  if(todosStorageData.length <= 0) {
		  todosStorageData = todos;
		  localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
	  }
	  
	  // returns the current list of todos
	  $httpBackend.whenGET('todos').respond(todosStorageData);
	
	  // adds a new todo to the todos storage
	  $httpBackend.whenPOST('todos').respond(function(method, url, data) {
	    var todo = angular.fromJson(data);
	    todo.id = todosStorageData.length;
	    localStorage.setItem(STORAGE_ID, JSON.stringify(todo));
	    return [200, todo, {}];
	  });
	  
	  // delete a todo to todos storage
	  $httpBackend.whenDELETE(/^todos\/\d+$/).respond(function(method, url, data) {
		  	var regex = /^todos\/(\d+)/g;  
		  	var id = regex.exec(url)[1]; // First match on the second item.
		    id = parseInt(id, 10);
		    for (var i = 0; i < todosStorageData.length; i++) {
		        if (todosStorageData[i].id === id) {
		          var index = todosStorageData.indexOf(todosStorageData[i]);
		          todosStorageData.splice(index, 1);
		          break;
		        }
		      }
		    localStorage.setItem(STORAGE_ID, JSON.stringify(todosStorageData));
		    return [200, todosStorageData, {}];
	  });
	  
	  //update the existing todos
	  $httpBackend.whenPUT(/^todos\/\d+$/).respond(function(method, url, data) {
		    var regex = /^todos\/(\d+)/g;  
		    var todo = angular.fromJson(data);
		  	var id = regex.exec(url)[1]; // First match on the second item.
		    id = parseInt(id, 10);
		    for (var i = 0; i < todosStorageData.length; i++) {
		        if (todosStorageData[i].id === todo.id) {
		        	todosStorageData[i] = todo;
		          break;
		        }
		    }
		    localStorage.setItem(STORAGE_ID, JSON.stringify(todosStorageData));
		    return [200, todosStorageData, {}];
	  });
	  

	  $httpBackend.whenGET(/.*/).passThrough(); // Requests for templates are handled by the real server
	  
	});
})(window.angular);