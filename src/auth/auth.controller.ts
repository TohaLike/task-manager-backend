import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Req() req: Request, @Body() dto: AuthDto) {
    return this.authService.register(req, dto);
  }

  @Post('login')
  public async login(@Req() req: Request, @Body() dto: AuthDto) {
    return this.authService.login(req, dto);
  }

  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
