import TodoController from '../controllers/todo.controller';
import CreateTodoDto from '../dto/todo.dto';
import validationMiddleware from '../middleware/validation.middleware';
import authMiddleware from './../middleware/auth.middleware';
export class Todos {
  public path = '/todos';
  private todoController: TodoController = new TodoController();
  public routes(app): void {
    app.route(this.path).get(this.todoController.getAllTodos);
    app.route(`${this.path}/:id`).get(this.todoController.getTodoByid);
    app.route(`${this.path}/:id`)
            .all(authMiddleware)
            .patch(validationMiddleware(CreateTodoDto, true), this.todoController.modifyTodo)
            .delete(this.todoController.deleteTodo);
    app.route(this.path)
            .post(authMiddleware, validationMiddleware(CreateTodoDto), this.todoController.createTodo);
  }
}
