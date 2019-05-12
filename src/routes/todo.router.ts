import TodoController from '../controllers/todo.controller'

export class Todos {
    private todoController: TodoController = new TodoController();
    public path = '/todo';
    public routes(app): void {
        app.route('/deletetodo')
            .delete(this.todoController.deleteTodo);        
        app.route('/updatetodo')
            .put(this.todoController.modifyTodo);        
        app.route('/createtodo')
            .post(this.todoController.createTodo);
        app.route('/getalltodos')
            .get(this.todoController.getAllTodos);
        app.route('')
    }
}