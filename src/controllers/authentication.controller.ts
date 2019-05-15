import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import LogInDto from '../dto/logIn.dto';
import CreateUserDto from '../dto/user.dto';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import User from '../interfaces/user.interface';
import AuthenticationService from '../services/authentication.service';
import userModel from './../model/user.model';

class AuthenticationController implements Controller {
  public path = '/auth';
  public authenticationService = new AuthenticationService();
  private user = userModel;

  public registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    console.log('registration', request.body);
    const userData: CreateUserDto = request.body;
    try {
      const {
        cookie,
        user,
      } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  }

  public loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        console.log('tokedata', '==================================',tokenData)
        user.token = tokenData;
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        console.log('user with token',user);
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }

  public loggingOut = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = 'ogA9ppB$S!dy!hu3Rauvg!L96';
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

}

export default AuthenticationController;
