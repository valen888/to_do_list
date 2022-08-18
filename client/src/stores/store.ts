import { defineStore } from "pinia";
import axios from "axios";
import Task from "../models/interface/task.interface";
import UpdateTaskDto from "../models/dto/update-task.dto";
import DeleteTaskDto from "../models/dto/delete-task.dto";
import AddTaskDto from "../models/dto/add-task.dto";

export const store = defineStore("main", {
  state: () => {
    const tasks: Task[] = [];

    const axiosBaseUrl: string = import.meta.env.VITE_AXIOS_BASE_URL;

    return { tasks, axiosBaseUrl };
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
      const tasks = await axios.get(`${this.axiosBaseUrl}todo/getTasks`);

      this.tasks = tasks.data;
    },

    async addNewTask(addTaskDto: AddTaskDto) {
      const response = await axios.post(
        `${this.axiosBaseUrl}todo/addTask`,
        addTaskDto
      );

      const newTask = response.data;

      this.tasks.push(newTask);
    },

    async changeTaskStatus(task: Task) {
      const updateTaskDto: UpdateTaskDto = {
        id: task.id,
        text: task.text,
        isDone: !task.isDone,
      };

      const response = await axios.put(
        `${this.axiosBaseUrl}todo/updateTask`,
        updateTaskDto
      );

      const updatedTask = response.data;

      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

      this.tasks[taskIndex] = updatedTask;
    },

    async removeTask(taskId: string) {
      const deleteTaskDto: DeleteTaskDto = {
        id: taskId,
      };

      await axios.delete(`${this.axiosBaseUrl}todo/deleteTask`, {
        data: deleteTaskDto,
      });

      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);

      this.tasks.splice(taskIndex, 1);
    },

    async updateTaskText(task: UpdateTaskDto) {
      const response = await axios.put(
        `${this.axiosBaseUrl}todo/updateTask`,
        task
      );

      const updatedTask = response.data;

      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

      this.tasks[taskIndex] = updatedTask;
    },
  },
});
