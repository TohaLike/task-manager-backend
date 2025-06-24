import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Электронная почта обязательна для заполнения.' })
  @IsEmail({}, { message: 'Неверный формат электронной почты.' })
  email: string;

  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @Length(8, 100, { message: 'Пароль должен содержать от 8 до 100 символов' })
  password: string;
}
