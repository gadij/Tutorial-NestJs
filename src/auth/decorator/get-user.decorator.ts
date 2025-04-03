import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const GetUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return request?.user?.[data];
    }
    return request?.user;
  },
);

export { GetUser };
