import TodoController from '../controllers/todo.controller'
import validationMiddleware from '../middleware/validation.middleware';
import CreateTodoDto from '../dto/todo.dto';
export class Todos {
    private todoController: TodoController = new TodoController();
    public path = '/todo';
    public routes(app): void {

        // app.get(this.path, this.todoController.getAllTodos)
        // app.get(`/hello/:id`, this.todoController.getTodoByid)
        // app.delete(`${this.path}/:id`,this.todoController.deleteTodo)
        // app.post(this.path,validationMiddleware(CreateTodoDto),this.todoController.createTodo)
        // .all(`${this.path}/:id`, validationMiddleware(CreateTodoDto),this.todoController.modifyTodo)
        // .patch(`${this.path}/:id`, validationMiddleware(CreateTodoDto),this.todoController.modifyTodo)





        app.route(`${this.path}/:id`)
            .get(this.todoController.getTodoByid);
        // app.route(`${this.path}/:id`)
        //     .get(this.todoController.getTodoByid);
        app.route(`${this.path}/:id`)
            .delete(this.todoController.deleteTodo);        
        app.route(`${this.path}/:id`)
            .patch(this.todoController.modifyTodo);
        app.route(this.path)
            .post(validationMiddleware(CreateTodoDto),this.todoController.createTodo);
    }
}