import { NextFunction, Request, Response } from 'express';
import CreateTodoDto from '../dto/todo.dto';
import TodoNotFoundException from '../exceptions/TodoNotFoundException';
import Controller from '../interfaces/controller.interface';
import todoModel from '../model/todo.model';

export default class TodoController implements Controller {
  public path = '/todo';
  private todo = todoModel;
  public getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    console.log('get all data');
    try {
      const data = await this.todo.find().populate('author', '-password');
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
    console.log('get todo by id', req.body);
    try {
      const { id } = req.params;
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
    const { title, description } = req.body;
    const { id } = req.params;
    console.log({ id, title, description });
    try {
      const data = await this.todo.updateOne({ _id:id }, { $set:{ title, description } }, { upsert: true });
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
    console.log('create to do');
    const todoData: CreateTodoDto = req.body;
    const createdTodo = new this.todo({
      ...todoData,
      author: req.user._id,
    });
    const savedTodo = await createdTodo.save();
    await savedTodo.populate('author', '-password').execPopulate();
    res.send(savedTodo);
  }

  public deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    console.log('delete todo');
    const id = req.params.id;
    const successResponse = await this.todo.findByIdAndDelete(id);
    if (successResponse) {
      res.send(200);
    } else {
      next(new TodoNotFoundException(id));
    }
  }

}
