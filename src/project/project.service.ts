import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOwnedById(userId: string, id: string) {
    const projects = await this.prisma.project.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });

    return projects;
  }

  public async findAllOwnedById(id: string) {
    const projects = await this.prisma.project.findMany({
      where: {
        ownerId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects;
  }

  public async create(ownerId: string, title: string) {
    const project = await this.prisma.project.create({
      data: {
        ownerId,
        title,
      },
    });

    return project;
  }

  public async delete(id: string) {
    const isProject = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!isProject) {
      throw new NotFoundException('Проект не найден');
    }
    
    const tasks = await this.prisma.task.deleteMany({
      where: {
        userId: id,
      },
    });

    const project = await this.prisma.project.delete({
      where: {
        id,
      },
    });

    return { project, tasks };
  }
}
