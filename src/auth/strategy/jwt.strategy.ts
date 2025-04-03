import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
// This is the JWT strategy for authentication, which extracts the JWT from the request and validates it.
// It uses the Passport library to handle the authentication process.
// The strategy checks the JWT against the secret key and retrieves the user information from the database using Prisma.
// The validate method is called after the JWT is verified, and it retrieves the user from the database using the user ID in the JWT payload.
// If the user is found, it returns the user object without the password hash. If not, it returns null.
// The constructor initializes the strategy with the JWT extraction method and the secret key from the configuration.
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!user) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...rest } = user;
    return rest;
  }
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET', ''),
    });
  }
}
