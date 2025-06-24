import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async register(req: Request, dto: AuthDto) {
    const candidate = await this.userService.findByEmail(dto.email);

    if (candidate) {
      throw new ConflictException(
        'Пользователь с таким почтовым адресом уже зарегистрирован',
      );
    }

    const newUser = await this.userService.create(dto.email, dto.password);

    console.log(newUser)

    await this.saveSession(req, newUser);

    return {
      message: 'Вы успешно зарегистрировались! ',
    };
  }

  public async login(dto: AuthDto) {}

  public async logout() {}

  private async saveSession(req: Request, user: any) {
    console.log(user.id)
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
