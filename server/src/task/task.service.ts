import { Injectable } from '@nestjs/common';
import { TaskDatabaseService } from './database/task.db.service';
import AddTaskDto from './dto/add-task.dto';
import DeleteTaskDto from './dto/delete-task.dto';
import UpdateTaskDto from './dto/update-task.dto';
import Task from './interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(private taskDatabase: TaskDatabaseService) {}

  async addTask(addTaskDto: AddTaskDto): Promise<Task> {
    const newTask = await this.taskDatabase.addTask(addTaskDto);

    return newTask;
  }

  async getTask(taskId: string): Promise<Task> {
    const task = await this.taskDatabase.getTask(taskId);

    return task;
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskDatabase.getTasks();

    return tasks;
  }

  async updateTask(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskDatabase.updateTask(updateTaskDto);

    return updatedTask;
  }

  async deleteTask(deleteTaskDto: DeleteTaskDto): Promise<void> {
    await this.taskDatabase.deleteTask(deleteTaskDto);
  }
}
