import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { ProjectService } from 'src/project/project.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, ProjectService, UserService],
})
export class WorkspaceModule {}
