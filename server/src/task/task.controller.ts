import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddTaskDto } from './dto/add-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './interfaces/task.interface';
import { TaskService } from './task.service';

@Controller('todo')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('getTask/:taskId')
  async getTask(@Param('taskId') taskId: string): Promise<Task> {
    const task = await this.taskService.getTask(taskId);

    return task;
  }

  @Get('getTasks')
  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskService.getTasks();

    return tasks;
  }

  @Post('addTask')
  async addTask(@Body() addTaskDto: AddTaskDto): Promise<Task> {
    const newTask = await this.taskService.addTask(addTaskDto);

    return newTask;
  }

  @Put('updateTask')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskService.updateTask(updateTaskDto);

    return updatedTask;
  }

  @Delete('deleteTask')
  async deleteTask(@Body() deleteTaskDto: DeleteTaskDto): Promise<void> {
    await this.taskService.deleteTask(deleteTaskDto);
  }
}
