import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // console.log('dto', dto);
    const hashPassword = await argon.hash(dto.password);
    // try {
    //   console.log('this.prisma', this.prisma);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hashPassword,
      },
    });

    return user;
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { hash, ...result } = user;

    //   return result;
    // } catch (error) {
    //   if (error instanceof PrismaClientKnownRequestError) {
    //     if (error.code === 'P2002') {
    //       throw new ForbiddenException('Credentials already exist');
    //     }
    //   }
    //   throw error;
    // }
    // return { msg: 'I am signup' };
  }

  signin(dto: AuthDto) {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     email: dto.email,
    //   },
    // });

    // if (!user) {
    //   throw new ForbiddenException('credentials are invalid');
    // }

    // const pwMatches = await argon.verify(user.hash, dto.password);
    // if (!pwMatches) {
    //   throw new ForbiddenException('credentials are invalid');
    // }
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { hash, ...result } = user;
    // return result;
    return { msg: 'I am signin' };
  }
}
