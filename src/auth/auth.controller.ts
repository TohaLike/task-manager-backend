import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register() {
    return this.authService.register();
  }

  @Post('login')
  public async login() {
    return this.authService.login();
  }

  @Post('logout')
  public async logout() {
    return this.authService.logout();
  }
}
