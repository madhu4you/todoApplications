'use strict';
angular.module('todoApp').factory('todoFactory', ['$q','$http', function($q, $http) {
    var STORAGE_ID = 'todos-storage-local';
    var todoData = {
        todos: [],

        //get the data from localstorage
        _getFromLocalStorage: function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
        },

        //save the data to storage
        _saveToLocalStorage: function (todos) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
        },

        clearCompleted: function () {
            var deferred = $q.defer();

            var completeTodos = [];
            var incompleteTodos = [];
            todoData.todos.forEach(function (todo) {
                if (todo.completed) {
                    completeTodos.push(todo);
                } else {
                    incompleteTodos.push(todo);
                }
            });

            angular.copy(incompleteTodos, todoData.todos);

            todoData._saveToLocalStorage(todoData.todos);
            deferred.resolve(todoData.todos);

            return deferred.promise;
        },

        deleteTodo: function (todo) {
            var deferred = $q.defer();

            todoData.todos.splice(todoData.todos.indexOf(todo), 1);

            todoData._saveToLocalStorage(todoData.todos);
            deferred.resolve(todoData.todos);

            return deferred.promise;
        },

        get: function () {
            var deferred = $q.defer();

            angular.copy(todoData._getFromLocalStorage(), todoData.todos);
            deferred.resolve(todoData.todos);

            return deferred.promise;
        },

        insert: function (todo) {
            var deferred = $q.defer();
            todoData.todos.push(todo);
            
            $http.post('/api/todos', todo)
            .then(function () {
                //success

            }, function () {
                todoData._saveToLocalStorage(todoData.todos);
            });

            
            deferred.resolve(todoData.todos);

            return deferred.promise;
        },

        put: function (todo, index) {
            var deferred = $q.defer();

            todoData.todos[index] = todo;

            todoData._saveToLocalStorage(todoData.todos);
            deferred.resolve(todoData.todos);

            return deferred.promise;
        }
    };

    return todoData;
}]);