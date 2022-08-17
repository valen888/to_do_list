import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoTask, MongoTaskSchema } from './schemas/task.schema';
import { TaskDatabaseService } from './task.db.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://localhost:27017',
        dbName: 'todolist',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: MongoTask.name, schema: MongoTaskSchema },
    ]),
  ],

  exports: [
    MongooseModule.forFeature([
      { name: MongoTask.name, schema: MongoTaskSchema },
    ]),
    TaskDatabaseService,
  ],

  providers: [TaskDatabaseService],
})
export class MongoModule {}
