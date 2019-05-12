import HttpException from "./HttpException";
 
export default class TodoNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Todo with id ${id} not found`);
  }
}