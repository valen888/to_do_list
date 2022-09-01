import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AddTaskDto from '../dto/add-task.dto';
import DeleteTaskDto from '../dto/delete-task.dto';
import UpdateTaskDto from '../dto/update-task.dto';
import ITask from '../interfaces/task.interface';
import { MongoTask } from './schemas/task.schema';

export class TaskDatabaseService {
  constructor(
    @InjectModel(MongoTask.name)
    private readonly taskModel: Model<MongoTask>,
  ) {}

  async addTask(addTaskDto: AddTaskDto): Promise<ITask> {
    try {
      const taskToCreate = { text: addTaskDto.text, isDone: false };

      const taskToSave = new this.taskModel(taskToCreate);
      const newTask = await taskToSave.save();

      return newTask as ITask;
    } catch (error) {
      throw new HttpException(
        `Failed to add new task, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getTask(taskId: string): Promise<ITask> {
    try {
      const task = await this.taskModel.findById(taskId).exec();

      if (!task) {
        throw new HttpException(
          `Could not find task with id ${taskId}`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return task as ITask;
      }
    } catch (error) {
      throw new HttpException(
        `Failed to get task with id ${taskId}, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getTasks(): Promise<ITask[]> {
    try {
      const sites = await this.taskModel.find();

      return sites as ITask[];
    } catch (error) {
      throw new HttpException(
        `Failed to get all tasks, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<ITask> {
    try {
      const updatedTask = await this.taskModel
        .findByIdAndUpdate(
          updateTaskDto.id,
          {
            text: updateTaskDto.text,
            isDone: updateTaskDto.isDone,
          },
          { new: true },
        )
        .exec();

      return updatedTask as ITask;
    } catch (error) {
      throw new HttpException(
        `Failed to update task with id ${updateTaskDto.id}, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void> {
    try {
      await this.taskModel.findByIdAndDelete(deleteTaskDto.id).exec();
    } catch (error) {
      throw new HttpException(
        `Failed to delete task with id ${deleteTaskDto.id}, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
