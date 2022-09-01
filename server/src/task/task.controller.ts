import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import AddTaskDto from './dto/add-task.dto';
import DeleteTaskDto from './dto/delete-task.dto';
import UpdateTaskDto from './dto/update-task.dto';
import ITask from './interfaces/task.interface';
import { TaskService } from './task.service';

@Controller('todos')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('task/:id')
  async getTask(@Param('id') taskId: string): Promise<ITask> {
    const task: ITask = await this.taskService.getTask(taskId);

    return task;
  }

  @Get('tasks')
  async getTasks(): Promise<ITask[]> {
    const tasks: ITask[] = await this.taskService.getTasks();

    return tasks;
  }

  @Post('task')
  async addTask(@Body() addTaskDto: AddTaskDto): Promise<ITask> {
    const newTask: ITask = await this.taskService.addTask(addTaskDto);

    return newTask;
  }

  @Put('task')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<ITask> {
    const updatedTask: ITask = await this.taskService.updateTask(updateTaskDto);

    return updatedTask;
  }

  @Delete('task')
  async deleteTask(@Body() deleteTaskDto: DeleteTaskDto): Promise<void> {
    await this.taskService.deleteTask(deleteTaskDto);
  }
}
