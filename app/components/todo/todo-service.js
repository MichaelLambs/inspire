function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = 'https://inspire-server.herokuapp.com/api/mike-lamb'

	
	function Todo(item){
		this.item = item
	}
	
	
	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getTodos = function getTodos(callback) {
		
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				callback(res)
			})
			.fail(logError)
	}

	this.addTodo = function addTodo(todo, callback) {
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function(res){ // <-- WHAT DO YOU DO AFTER CREATING A NEW TODO?
				todoList.unshift(res)
				callback(res)
			}) 
			.fail(logError)
	}

	this.editTodo = function editTodo(todoChange, todoId, callback){

		// for (const todoId in todoList) {
		// 	if (todoList.hasOwnProperty(todoId)) {
		// 		const match = todoList[todoId];
		// 		updatedTodo = new Todo()
		// 	}
		// }

		

		var updatedTodo = ''
		debugger
		for (const todoId in todoList) {
			if (todoList[todoId]) {
				updatedTodo = new Todo(todoChange.todo.value)
				
			}
		}
		// for in loop to find the todo by id
		// update the item property and pass into updatedTodo
		console.log(todoChange.todo.value)
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + todoId,
			data: JSON.stringify(updatedTodo)
		})
			.then(res => {
				this.getTodos(callback)
			})
	}

	this.toggleTodoStatus = function (todoId) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList

		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed

		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + '/' + todoId,
			data: JSON.stringify(YOURTODOVARIABLEHERE)
		})
			.then(function (res) {
				//DO YOU WANT TO DO ANYTHING WITH THIS?
			})
			.fail(logError)
	}

	this.removeTodo = function (todoId, callback) {

		$.ajax({
			method: 'DELETE',
			url: baseUrl + '/' + todoId
		})
			.then( res => {
				this.getTodos(callback)
			})

		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETE
		
	}

}
