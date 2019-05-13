import TodoController from '../controllers/todo.controller'
import validationMiddleware from '../middleware/validation.middleware';
import CreateTodoDto from '../dto/todo.dto';
export class Todos {
    private todoController: TodoController = new TodoController();
    public path = '/todos';
    public routes(app): void {
        app.route(this.path)
            .get(this.todoController.getAllTodos);
        app.route(`${this.path}/:id`)
            .get(this.todoController.getTodoByid)
        app.route(this.path)
            .post(validationMiddleware(CreateTodoDto), this.todoController.createTodo);
        app.route(`${this.path}/:id`)
            .patch(this.todoController.modifyTodo);
        app.route(`${this.path}/:id`)
            .delete(this.todoController.deleteTodo);
    }
}