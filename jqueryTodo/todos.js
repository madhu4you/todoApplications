$(document).ready(function () {
    $('#saveTask').click(function (e) {
        insertTodo();
    }); // end if

    //local storage methods
    var STORAGE_ID = 'todos-storage-local';
    var getFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    }
    var saveToLocalStorage = function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
    var dateValidate = function (taskDate) {
        var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (taskDate.match(dateformat)) {
            var seperator1 = taskDate.split('/');
            var seperator2 = taskDate.split('-');

            if (seperator1.length > 1) {
                var splitdate = taskDate.split('/');
            }
            else if (seperator2.length > 1) {
                var splitdate = taskDate.split('-');
            }
            var dd = parseInt(splitdate[0]);
            var mm = parseInt(splitdate[1]);
            var yy = parseInt(splitdate[2]);
            var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (mm == 1 || mm > 2) {
                if (dd > ListofDays[mm - 1]) {
                    alert('Invalid date format!');
                    return false;
                }
            }
            if (mm == 2) {
                var lyear = false;
                if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                    lyear = true;
                }
                if ((lyear == false) && (dd >= 29)) {
                    alert('Invalid date format!');
                    return false;
                }
                if ((lyear == true) && (dd > 29)) {
                    alert('Invalid date format!');
                    return false;
                }
            }
            return true;
        }
        else {
            alert("Invalid date format!");
            return false;
        }
    }

    //function to insert the data 
    var todoList = $('#todo-list tbody');
    var allTodos = getFromLocalStorage();
    //after insert value
    var runBind = function () {
        $('.destroy').on('click', function (e) {
            $currentListItem = $(this).closest('li');
            $currentListItem.remove();

            //delete the task
            var taskId = $(this).data("id");
            taskId = parseInt(taskId, 10);
            for (var i = 0; i < allTodos.length; i++) {
                if (allTodos[i].id === taskId) {
                    var index = allTodos.indexOf(allTodos[i]);
                    allTodos.splice(index, 1);
                    break;
                }
            }
            saveToLocalStorage(allTodos);
        });

        $('.toggle').on('click', function (e) {
            var currentListItemLabel = $(this).closest('li').find('label');
            currentListItemLabel.toggleClass("strikeOut");
            var taskId = $(this).val();
            taskId = parseInt(taskId, 10);
            for (var i = 0; i < allTodos.length; i++) {
                if (allTodos[i].id === taskId) {
                    allTodos[i]['completed'] = $(this).prop("checked");
                    break;
                }
            }
            saveToLocalStorage(allTodos);
        });
    }
    var renderList = function (todoData) {
        $('.destroy').off('click');
        $('.toggle').off('click');
        var todos = "";
        var completeClass = '';
        var checkSelect = '';
        if (todoData.completed) {
            completeClass = "strikeOut";
            checkSelect = "checked";
        }
        todos += "<tr class='task-item'><td class='task-name'>" + todoData.title + "<span class='task-date'>" + todoData.date + "</span></td><td class='task-assigned'>" + todoData.assign + "</td></tr>";

        todos += todoList.html();
        $('#new-todo').val('');
        $("#new-date").val('');
        $("#new-assign").val('');
        todoList.html(todos);
        runBind();
        $('#main').show();
    }
    var listTodo = function () {
        if (allTodos.length >= 0) {
            for (var i = 0; i < allTodos.length; i++) {
                renderList(allTodos[i]);
            }
        }
    }
    listTodo();
    var insertTodo = function () {
        var newTodo = $('#new-todo').val().trim();
        var taskDate = $("#new-date").val().trim();
        var assignTask = $("#new-assign").val().trim();
        if (!newTodo && !taskDate && !assignTask) {
            alert("Please enter the values!");
            return;
        }
        else if (dateValidate(taskDate)) {
            var newTodoData = {
                title: newTodo,
                completed: false,
                date: taskDate,
                assign: assignTask,
                id: allTodos.length
            };
            //insert to local storage
            allTodos.push(newTodoData);
            saveToLocalStorage(allTodos);
            renderList(newTodoData);
        }
    }

});