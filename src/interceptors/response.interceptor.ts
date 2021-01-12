import { ResponseT } from './../@types/index';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseT> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map(data => {
        return {
          statusCode: response.statusCode,
          data,
        };
      }),
    );
  }
}
