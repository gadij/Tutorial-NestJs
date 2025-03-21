import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class AuthDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  password: string;
}

export { AuthDto };
