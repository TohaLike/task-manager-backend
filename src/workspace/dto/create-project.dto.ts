import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Название обязательно для заполнения.' })
  title: string;
}
