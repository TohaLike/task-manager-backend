import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Req() req: Request, @Body() dto: AuthDto) {
    console.log(req.session)
    return this.authService.register(req, dto);
  }

  @Post('login')
  public async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  public async logout() {
    return this.authService.logout();
  }
}
