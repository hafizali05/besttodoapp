import { IsString } from 'class-validator';

class LogInDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public token: string;
}

export default LogInDto;
