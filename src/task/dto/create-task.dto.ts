import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsUUID(4)
  projectId: string;

  @IsNotEmpty({ message: 'Название обязательно для заполнения.' })
  title: string;

  @Optional()
  description: string;
}
