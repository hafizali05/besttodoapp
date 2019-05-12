import { Request, Response, NextFunction } from "express";
import TodoNotFoundException from "../exceptions/TodoNotFoundException";
import todoModel from "../model/todo.model";
import Controller from '../interfaces/controller.interface';
import { IsString } from 'class-validator';

// import authMiddleware from '../middleware/auth.middleware';
// import validationMiddleware from '../middleware/validation.middleware';
// import CreatePostDto from './post.dto';
// import Post from './post.interface';
// import postModel from './post.model';
export default class TodoController implements Controller {
    public path = '/todo';
    private todo = todoModel;

    // constructor() {
    //   this.initializeRoutes();
    // }
    // private initializeRoutes() {
    //     this.router.get(this.path, this.getAllTodos);
    //     this.router.get(`${this.path}/:id`, this.getTodosById);
    //     this.router
    //       .all(`${this.path}/*`, authMiddleware)
    //       .patch(`${this.path}/:id`, validationMiddleware(CreateTodoDto, true), this.modifyTodo)
    //       .delete(`${this.path}/:id`, this.deletePost)
    //       .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
    // }    
    public getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const data = await dynamodb.scan({TableName:'besttododb'}).promise();
            const data = await this.todo.find()
            console.log(data)
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ error: 'Sorry, Todo does not exist!' });
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }


    public getTodoByid = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            const data = await this.todo.findById(id);
            if (data) {
                res.status(200).send(data);
            } else {
                next(new TodoNotFoundException(id));
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }



    public modifyTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, title, description } = req.body;
            const data = await this.todo.findByIdAndUpdate(id, { title, description });
            if (data) {
                res.send(data);
            } else {
                next(new TodoNotFoundException(id));
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }


    public createTodo = async (req: Request, res: Response, next: NextFunction) => {
        // const todoData: CreateTodoDto = req.body;
        // const createdTodo = new this.todo({
        //   ...todoData,
        //   author: req.user._id,
        // });
        // const savedTodo = await createdTodo.save();
        // await savedTodo.populate('author', '-password').execPopulate();
        // res.send(savedTodo);


        //without auth

        const todoData: CreateTodoDto = req.body;
        const createdTodo = new this.todo({
            ...todoData
        });
        const savedTodo = await createdTodo.save();
        await savedTodo.populate('author').execPopulate();
        res.send(savedTodo);

    }

    public deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const successResponse = await this.todo.findByIdAndDelete(id);
        if (successResponse) {
            res.send(200);
        } else {
            next(new TodoNotFoundException(id));
        }
    }

}


class CreateTodoDto {
    @IsString()
    public content: string;

    @IsString()
    public title: string;
}