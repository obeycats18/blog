import { User } from './../../users/models/user.model';
import { Roles } from '../enums/role.enum';
import { ROLES_KEY } from './../decorators/role.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflertor: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const neededRoles = this.reflertor.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!neededRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();

    const user: User = request.session['user'];

    return neededRoles.some(role => user.roles.includes(role));
  }
}
