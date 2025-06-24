import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor (private readonly prismaService: PrismaService) {}

  public async create(title: string, description: string) {}

  public async delete() {}

  public async update() {}

  public async findById() {}

}
