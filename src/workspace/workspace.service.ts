import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class WorkspaceService {
  constructor(private readonly projectService: ProjectService) {}

  public async createProject(id: string, dto: CreateProjectDto) {
    const project = await this.projectService.create(id, dto.title);
    return project;
  }

  public async deleteProject(projectId: string) {
    const project = await this.projectService.delete(projectId);
    return project;
  }

  public async getProjects(id: string) {
    const projects = await this.projectService.findAllOwnedById(id);

    if (!projects) {
      throw new NotFoundException('Проекты не найдены');
    }

    return projects;
  }

  public async getProject(userId: string, id: string) {
    const project = await this.projectService.findOwnedById(userId, id);

    if (!project) {
      throw new NotFoundException('Проект не найден');
    }

    return project;
  }
}
