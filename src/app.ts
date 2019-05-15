import * as bodyParser from 'body-parser'; // use to parse the form data that you pass in the request
import { dotenv } from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import 'reflect-metadata';
import errorMiddleware from './middleware/error.middleware';
import { Authentication } from './routes/authentication.routes';
import { Todos } from './routes/todo.router';
import { Users } from './routes/user.router';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
class App {

  public app: express.Application;

  public todoRoutes: Todos = new Todos();
  public userRoutes: Users = new Users();
  public authenticationRoutes: Authentication = new Authentication();
  constructor() {
    this.app = express(); // TK
    this.config();
    this.todoRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.authenticationRoutes.routes(this.app);
  }
  private loggerMiddleware(request: express.Request, response: express.Response, next) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

  private setCors(request: express.Request, response: express.Response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    response.header('Access-Control-Expose-Headers', 'x-auth-token');
    next();
  }
  private config(): void {
    this.app.use(this.loggerMiddleware);
    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({
      extended: false,
    }));
    this.app.use(errorMiddleware);
    this.app.use(this.setCors);
  }

}

export default new App().app;
