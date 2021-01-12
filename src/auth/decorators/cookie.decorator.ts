import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Response, Request, CookieOptions } from 'express';

export type Cookies = {
  getCookie: () => any;
  setCookie: (name: string, value: string, options?: CookieOptions) => void;
};

export const Cookie = createParamDecorator(
  (name: string, ctx: ExecutionContext): Cookies => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const response = ctx.switchToHttp().getResponse<Response>();

    return {
      getCookie: () => (name ? request.cookies[name] : request.cookies),
      setCookie: (name: string, value: string, options?: CookieOptions) =>
        response.cookie(name, value, options),
    };
  },
);
