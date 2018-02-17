function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()
	var todoListElem = document.getElementById('todo')
	
	// Use this getTodos function as your callback for all other edits
	function getTodos(){
		//FYI DONT EDIT ME :)
		todoService.getTodos(draw)
	}

	function draw(todos) {
		var template = '<div class="list-group">'

		for (let i = 0; i < todos.length; i++) {
			const todo = todos[i];
			// debugger

			
			template += `
				<div class="input-group">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<input onclick="app.controllers.todoController.makeComplete(event, '${todo.id}')" type="checkbox">
						</div>
					</div>
					<div class="input-group-text bg-white">
						<h4>${todo.item} | complete status: ${todo.completed}</h4>
					</div>
					<div class="input-group-append icon-holder">
						<div class="input-group-text">
							<i onclick="app.controllers.todoController.removeTodo('${todo.id}')" class="pointer fa-1x fa fa-trash"></i>
							<i onclick="app.controllers.todoController.showEditTodo('${todo.id}')" class="pointer fa-1x fa fa-pencil"></i>
						</div>
						<div class="input-group-text">
							<h5>${todos.length}</h5>
						</div>
					</div>
				</div>
				<form class="hidden" id="edit-${todo.id}" onsubmit="app.controllers.todoController.editTodo(event, '${todo.id}')">
					<div class="form-row justify-content-center">
						<div class="col-sm-2">
							<input type="text" class="form-control" name="todo" value="${todo.item}" required>
							<button type="submit" class="btn btn-success">Edit</button>
						</div>
					</div>
				</form>		
			`
	
		}
		todoListElem.innerHTML = template + `</div>`

	}

	this.makeComplete = function makeComplete(event, todoId){
		event.preventDefault();
		completeTodo = event.target

		todoService.makeComplete(completeTodo, todoId, getTodos)

	}



	this.showEditTodo = function showEditTodo(id){
		var form = document.getElementById('edit-' + id)
		form.classList.remove('hidden')
	}

	this.removeTodo = function(todoId){
		todoService.removeTodo(todoId, draw)
	}

	this.addTodoFromForm = function addTodoFromForm(event) {
		event.preventDefault() // <-- hey this time its a freebie don't forget this
		var form = event.target
		var todo = {
			item: form.todo.value,
			completed: false
		}
		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		todoService.addTodo(todo, getTodos)
		form.reset()
		                         //^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	this.editTodo = function editTodo(event, todoId) {
		event.preventDefault();
		todoChange = event.target
		// asks the service to edit the todo status
		todoService.editTodo(todoChange, todoId, getTodos)
		// YEP THATS IT FOR ME
		// form.reset()
	}
		
	getTodos()
}
