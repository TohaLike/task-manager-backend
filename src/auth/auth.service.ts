import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async register(req: Request, dto: AuthDto) {
    const candidate = await this.userService.findByEmail(dto.email);

    if (candidate) {
      throw new ConflictException(
        'Пользователь с таким почтовым адресом уже зарегистрирован',
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(dto.password, saltOrRounds);

    const newUser = await this.userService.create(dto.email, hash);

    await this.saveSession(req, newUser);

    return {
      message: 'Вы успешно зарегистрировались! ',
    };
  }

  public async login(req: Request, dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('Пользователь не зарегистрирован в системе');
    }

    const isValidPassword = await bcrypt.compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new NotFoundException('Неверный пароль');
    }

    return this.saveSession(req, user);
  }

  public async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resoleve, reject) => {
      req.session.destroy((error) => {
        if (error) {
          return reject(
            new InternalServerErrorException(
              'Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена.',
            ),
          );
        }
      });

      res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
      resoleve();
    });
  }

  private async saveSession(req: Request, user: any) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save((error) => {
        if (error) {
          console.log(error);
          return reject(
            new InternalServerErrorException(
              'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии',
            ),
          );
        }

        resolve({ user });
      });
    });
  }
}
