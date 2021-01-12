import { RoleGuard } from './guards/role.quard';
import { JWTAuthGuard } from './guards/jwt.guard';
import {
  COOKIE_NAME_ACCESS_TOKEN,
  COOKIE_NAME_REFRESH_TOKEN,
} from './constants/contstants';
import { RegistrationDTO } from './dto/registration.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './services/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Cookie, Cookies } from './decorators/cookie.decorator';
import { Roles } from './enums/role.enum';
import { Role } from './decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() payload: LoginDTO,
    @Cookie() cookies: Cookies,
  ) {
    const { tokens, user } = await this._authService.login(payload);

    cookies.setCookie(COOKIE_NAME_ACCESS_TOKEN, tokens.access_token);
    cookies.setCookie(COOKIE_NAME_REFRESH_TOKEN, tokens.refresh_token, {
      httpOnly: true,
    });

    session.user = user;

    return user;
  }

  @Post('registration')
  async registration(@Body() payload: RegistrationDTO) {
    await this._authService.registration(payload);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getMe(@Cookie(COOKIE_NAME_ACCESS_TOKEN) cookies: Cookies) {
    return this._authService.getMe(cookies.getCookie());
  }

  @Put('change-password')
  @UseGuards(JWTAuthGuard)
  async changePassword(
    @Cookie(COOKIE_NAME_ACCESS_TOKEN) cookies: Cookies,
    @Body('password') password: string,
  ) {
    return this._authService.changePassword(cookies.getCookie(), password);
  }

  @Get('test')
  @Role(Roles.Admin)
  @UseGuards(JWTAuthGuard, RoleGuard)
  async test() {
    return 'test';
  }
}
