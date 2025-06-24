import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    userId: string,
    projectId: string,
    title: string,
    description: string,
  ) {
    const task = await this.prismaService.task.create({
      data: {
        userId,
        projectId,
        title,
        description,
      },
    });

    return task;
  }

  public async delete(taskId: string) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    const deletedTask = await this.prismaService.task.delete({
      where: {
        id: taskId,
      },
    });

    return deletedTask;
  }

  public async update() {}

  public async findAllById(roomId: string) {
    const tasks = await this.prismaService.task.findMany({
      where: {
        projectId: roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tasks;
  }

  public async findById() {}

  public async complete(id: string) {
    const task = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }

    if (task.isComplited) {
      return this.prismaService.task.update({
        where: { id },
        data: { isComplited: false },
      });
    }

    return this.prismaService.task.update({
      where: { id },
      data: { isComplited: true },
    });
  }
}
