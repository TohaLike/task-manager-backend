import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@UseGuards(AuthGuard)
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('create-project')
  public async createProject(
    @Authorized('id') id: string,
    @Body() dto: CreateProjectDto,
  ) {
    return this.workspaceService.createProject(id, dto);
  }

  @Post('delete-project/:id')
  public async deleteProject(@Param('id') projectId: string) {
    return this.workspaceService.deleteProject(projectId);
  }

  @Get('get-projects')
  public async getProjects(@Authorized('id') id: string) {
    return this.workspaceService.getProjects(id);
  }

  @Get('get-project/:id')
  public async getProject(
    @Authorized('id') id: string,
    @Param('id') projectId: string,
  ) {
    return this.workspaceService.getProject(id, projectId);
  }
}
