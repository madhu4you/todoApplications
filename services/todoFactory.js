'use strict';
angular.module('todoApp').factory('todoFactory', ['$q','$http', function($q, $http) {

	var todoData = {
		todos: [],

		clearCompleted: function () {
			var oldTodos = todoData.todos;

			var completeTodos = [];
			var incompleteTodos = [];
			todoData.todos.forEach(function (todo) {
				if (todo.completed) {
					completeTodos.push(todo);
				} else {
					incompleteTodos.push(todo);
				}
			});

			todoData.todos = incompleteTodos;

			return $http.post('todos', todoData)
				.then(function success(resp) {
					todo.id = resp.data.id;
					return todoData.todos;
				}, function error() {
					todoData.todos = oldTodos;
					return oldTodos;
				});
		},

		deleteTodo: function (todo) {
			var oldTodos = todoData.todos;

			return $http.delete('todos/' + todo.id)
				.then(function success() {
					return todoData.todos;
				}, function error() {
					todoData.todos = oldTodos;
					return oldTodos;
				});
		},

		get: function () {
			return $http.get('todos')
				.then(function (resp) {
					todoData.todos = resp.data;
					return todoData.todos;
				});
		},

		insert: function (todo) {
			var oldTodos = todoData.todos;
			todoData.todos.push(todo);
			return $http.post('todos', todoData)
				.then(function success(resp) {
					todo.id = resp.data.id;
					return todoData.todos;
				}, function error() {
					todoData.todos = oldTodos;
					return oldTodos;
				});
		},

		put: function (todo) {
			var oldTodos = todoData.todos;
			return $http.put('todos/' + todo.id, todo)
				.then(function success() {
					return todoData.todos;
				}, function error() {
					todoData.todos = oldTodos;
					return oldTodos;
				});
		}
	};
	return todoData;
}]);