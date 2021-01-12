import { HttpStatus } from '@nestjs/common';

export type ResponseT<T = any> = {
  statusCode: HttpStatus;
  data: T;
};
