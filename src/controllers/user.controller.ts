import * as express from 'express';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import Controller from '../interfaces/controller.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import todoModel from './../model/todo.model';

class UserController implements Controller {
  public path = '/users';
  private todo = todoModel;

  public getAllTodosOfUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
    const userId = request.params.id;
    if (userId === request.user._id.toString()) {
      const todos = await this.todo.find({ author: userId });
      response.send(todos);
    }
    next(new NotAuthorizedException());
  }
}

export default UserController;
