import * as todoController from '../controllers/todo.controller'

export class Todos {
    public routes(app): void {

        // app.route('/todo')
        // .get((req: Request, res: Response) => {            
        //     res.status(200).send(tododb);
        // })
        app.route('/deletetodo')
            .delete(todoController.deleteTodo)        
        app.route('/updatetodo')
            .put(todoController.updateTodo)        
        app.route('/addtodo')
            .post(todoController.addTodo)
        app.route('/getAll')
            .get(todoController.getAll)

        // app.route('/todo/:id')
        // .get((req:Request, res: Response) => {
        //     let id = req.params.id;
        //     res.status(200).send(tododb[id]);
        // })
    }
}