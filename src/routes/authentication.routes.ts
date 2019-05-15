import AuthenticationController from '../controllers/authentication.controller';
import LogInDto from '../dto/logIn.dto';
import CreateUserDto from '../dto/user.dto';
import validationMiddleware from '../middleware/validation.middleware';
export class Authentication {
  public path = '/auth';
  private authenticationController: AuthenticationController = new AuthenticationController();
  public routes(app): void {
    app.route(`${this.path}/register`).post(validationMiddleware(CreateUserDto), this.authenticationController.registration);
    app.route(`${this.path}/login`).post(validationMiddleware(LogInDto), this.authenticationController.loggingIn);
    app.route(`${this.path}/logout`).post(this.authenticationController.loggingOut);
  }
}
