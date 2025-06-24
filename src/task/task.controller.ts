import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  public async create(
    @Authorized('id') userId: string,
    @Body() dto: CreateTaskDto,
  ) {
    return this.taskService.create(
      userId,
      dto.projectId,
      dto.title,
      dto.description,
    );
  }

  @Post('delete/:taskId')
  public async delete(@Param('taskId') taskId: string) {
    return this.taskService.delete(taskId);
  }

  @Get('get-tasks/:roomId')
  public async getAllTasks(@Param('roomId') roomId: string) {
    return this.taskService.findAllById(roomId);
  }

  @Post('complete/:id')
  public async complete(@Param('id') id: string) {
    return this.taskService.complete(id);
  }
}
