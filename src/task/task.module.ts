import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
