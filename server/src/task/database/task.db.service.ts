import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AddTaskDto from '../dto/add-task.dto';
import DeleteTaskDto from '../dto/delete-task.dto';
import UpdateTaskDto from '../dto/update-task.dto';
import Task from '../interfaces/task.interface';
import { MongoTask } from './schemas/task.schema';

export class TaskDatabaseService {
  constructor(
    @InjectModel(MongoTask.name)
    private readonly taskModel: Model<MongoTask>,
  ) {}

  async addTask(addTaskDto: AddTaskDto): Promise<Task> {
    try {
      const taskToCreate = { text: addTaskDto.text, isDone: false };

      const taskToSave = new this.taskModel(taskToCreate);
      const newTask = await taskToSave.save();

      return newTask as Task;
    } catch (error) {
      throw new HttpException(
        `Failed to add new task, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getTask(taskId: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(taskId).exec();

      if (!task) {
        throw new HttpException(
          `Could not find task with id ${taskId}`,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return task as Task;
      }
    } catch (error) {
      throw new HttpException(
        `Failed to get task with id ${taskId}, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const sites = await this.taskModel.find();

      return sites as Task[];
    } catch (error) {
      throw new HttpException(
        `Failed to get all tasks, info: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
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

      return updatedTask as Task;
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
