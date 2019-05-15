import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../model/user.model';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  console.log(request.headers.authorization);

  // TRIED GETTING DATA WITH COOKIE BUT UNABLE TO DO SO
  // HENCE I AM AUNTHENTICATING WITH THE TOKEN IN THE HEADER
  console.log('cookieeeeee', '====================================================', request.cookies);
  const cookies = request.cookies;
  // if (cookies && cookies.Authorization) {
  if (request && request.headers && request.headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      // const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const verificationResponse = jwt.verify(request.headers.authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
