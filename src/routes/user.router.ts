import UserController from '../controllers/user.controller';
import authMiddleware from '../middleware/auth.middleware';
export class Users {
  public path = '/users';
  private userController: UserController = new UserController();
  public routes(app): void {
    app.route(`${this.path}/:id/todos`, authMiddleware, this.userController.getAllTodosOfUser);
  }
}
