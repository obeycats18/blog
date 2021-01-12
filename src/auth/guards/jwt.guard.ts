import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { COOKIE_NAME_ACCESS_TOKEN } from '../constants/contstants';

import { Request } from 'express';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: Request) {
    return !!request.cookies[COOKIE_NAME_ACCESS_TOKEN];
  }
}
