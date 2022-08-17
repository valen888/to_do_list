import { Module } from '@nestjs/common';
import { MongoModule } from './database/mongo.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [MongoModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
