import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigConstants } from 'src/common/constants/config.constants';
import { MongoTask, MongoTaskSchema } from './schemas/task.schema';
import { TaskDatabaseService } from './task.db.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(ConfigConstants.mongodbURI),
        dbName: configService.get<string>(ConfigConstants.mongoDbName),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
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
