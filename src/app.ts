import * as express from 'express';
import * as bodyParser from 'body-parser'; //use to parse the form data that you pass in the request
import { Todos } from "./routes/todo.router";
import errorMiddleware from './middleware/error.middleware';

class App {

    public app: express.Application;

    public todoRoutes: Todos = new Todos();

    constructor() {
        this.app = express(); //TK
        this.config();
        this.todoRoutes.routes(this.app);
    }
    private loggerMiddleware(request: express.Request, response: express.Response, next) {
      console.log(`${request.method} ${request.path}`);
      next();
    }
    private config(): void {
        this.app.use(this.loggerMiddleware)
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(errorMiddleware);
    }

}

export default new App().app;