import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import CreateUserDto from '../dto/user.dto';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import User from '../interfaces/user.interface';
import userModel from '../model/user.model';

class AuthenticationService {
  public user = userModel;

  public async register(userData: CreateUserDto) {
    console.log('entered register');
    if (
      await this.user.findOne({ email: userData.email })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      ...userData,
      password: hashedPassword,
    });
    user.password = undefined;
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    console.log('tokenData.token', tokenData.token);
    const userToken = JSON.stringify(tokenData.token);
    return {
      cookie,
      user,
      userToken,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
