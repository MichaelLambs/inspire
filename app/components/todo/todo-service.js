function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = 'https://inspire-server.herokuapp.com/api/mike-lamb'


	function Todo(item) {
		this.item = item
		this.completed = false
	}


	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getTodos = function getTodos(callback) {

		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				todoList = res
				callback(res)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, callback) {
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function (res) { // <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				todoList.unshift(res)
				callback(res)
			})
			.fail(logError)
	}

	this.editTodo = function editTodo(todoChange, todoId, callback) {

		var updatedTodo = ''
		todoList.forEach(function (todo) {
			if (todo.id == todoId) {
				todo.item = todoChange.todo.value
				updatedTodo = todo
			}
		})

		// for in loop to find the todo by id
		// update the item property and pass into updatedTodo
		$.ajax({
			method: 'PUT',
			// contentType: 'application/json', did not work???????
			url: baseUrl + '/' + todoId,
			data: updatedTodo
			// data: JSON.stringify(updatedTodo) did not work???/
		})
			.then(res => {
				this.getTodos(callback)
			})
	}

	this.makeComplete = function makeComplete(complete, todoId, callback) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList

		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed

		//STEP 3: Here is that weird Ajax request because $.put doesn't exist

		var completedTodo = ''
		todoList.forEach(function (todo) {
			// debugger
			if (todo.id == todoId && todo.completed == "false") {
				todo.completed = true
				completedTodo = todo
			} else if (todo.id == todoId && todo.completed == "true") {
				todo.completed = false
				completedTodo = todo
			}
		})

		$.ajax({
			method: 'PUT',
			// contentType: 'application/json',
			url: baseUrl + '/' + todoId,
			data: completedTodo
			// data: JSON.stringify(YOURTODOVARIABLEHERE)
		})
			.then(res => {
				this.getTodos(callback)
			})
			.fail(logError)
	}

	this.removeTodo = function (todoId, callback) {

		$.ajax({
			method: 'DELETE',
			url: baseUrl + '/' + todoId
		})
			.then(res => {
				this.getTodos(callback)
			})
	}

}
