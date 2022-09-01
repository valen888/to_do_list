import { defineStore } from "pinia";
import ITask from "../models/interface/task.interface";
import UpdateTaskDto from "../models/dto/update-task.dto";
import DeleteTaskDto from "../models/dto/delete-task.dto";
import AddTaskDto from "../models/dto/add-task.dto";
import axiosClient from "../plugins/axios";

export const store = defineStore("main", {
  state: () => {
    const tasks: ITask[] = [];

    return { tasks };
  },

  getters: {
    pendingTasks: (state) => {
      return state.tasks.filter((t) => t.isDone === false);
    },

    doneTasks: (state) => {
      return state.tasks.filter((t) => t.isDone === true);
    },
  },

  actions: {
    async initTasks() {
      try {
        let tasks: ITask[];

        const axiosResponse = await axiosClient.get(`todos/tasks`);

        tasks = axiosResponse.data;

        this.tasks = tasks;
      } catch (error: any) {
        throw new Error(`Failed to get all tasks, info: ${error.message}`);
      }
    },

    async addNewTask(addTaskDto: AddTaskDto) {
      try {
        const axiosResponse = await axiosClient.post(
          `todos/task`,
          addTaskDto
        );

        const newTask: ITask = axiosResponse.data;

        this.tasks.push(newTask);
      } catch (error: any) {
        throw new Error(`Failed to add new tasks, info: ${error.message}`);
      }
    },

    async changeTaskStatus(task: ITask) {
      try {
        const updateTaskDto: UpdateTaskDto = {
          ...task,
          isDone: !task.isDone,
        };

        const axiosResponse = await axiosClient.put(
          `todos/task`,
          updateTaskDto
        );

        const updatedTask: ITask = axiosResponse.data;

        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        this.tasks[taskIndex] = updatedTask;
      } catch (error: any) {
        throw new Error(
          `Failed to change task ${task.id} status, info: ${error.message}`
        );
      }
    },

    async removeTask(taskId: string) {
      try {
        const deleteTaskDto: DeleteTaskDto = {
          id: taskId,
        };

        await axiosClient.delete(`todos/task`, {
          data: deleteTaskDto,
        });

        const taskIndex = this.tasks.findIndex((t) => t.id === taskId);

        this.tasks.splice(taskIndex, 1);
      } catch (error: any) {
        throw new Error(
          `Failed to removeTask ${taskId} status, info: ${error.message}`
        );
      }
    },

    async updateTaskText(task: UpdateTaskDto) {
      try {
        const response = await axiosClient.put(`todos/task`, task);

        const updatedTask: ITask = response.data;

        const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

        this.tasks[taskIndex] = updatedTask;
      } catch (error: any) {
        throw new Error(
          `Failed to removeTask ${task.id} status, info: ${error.message}`
        );
      }
    },
  },
});
