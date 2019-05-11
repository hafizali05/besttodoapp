import * as todoController from '../controllers/todo' 

export class Todos {       
    public routes(app): void {  

        // app.route('/todo')
        // .get((req: Request, res: Response) => {            
        //     res.status(200).send(tododb);
        // })
        app.route('/getAll')
        .get(todoController.getAll)  
        
        // app.route('/todo/:id')
        // .get((req:Request, res: Response) => {
        //     let id = req.params.id;
        //     res.status(200).send(tododb[id]);
        // })
    }
}