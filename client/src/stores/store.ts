import { defineStore } from "pinia";
import axios from "axios";
import Task from "../models/interface/task.interface";
import UpdateTaskDto from "../models/dto/update-task.dto";
import DeleteTaskDto from "../models/dto/delete-task.dto";

export const store = defineStore("main", {
  state: () => {
    const tasks: Task[] = [];

    return { tasks };
  },

  getters: {
    getTasks: (state) => {
      return state.tasks;
    },

    pendingTasks: (state) => {
      return state.tasks.filter((t) => t.isDone === false);
    },

    doneTasks: (state) => {
      return state.tasks.filter((t) => t.isDone === true);
    },
  },

  actions: {
    async initTasks() {
      const tasks = await axios.get("http://localhost:3000/todo/getTasks");

      this.tasks = tasks.data;
    },

    addNewTask(task: Task) {
      this.tasks.push(task);
    },

    async changeTaskStatus(task: Task) {
      const updateTaskDto: UpdateTaskDto = {
        id: task.id,
        text: task.text,
        isDone: !task.isDone,
      };

      const response = await axios.put(
        "http://localhost:3000/todo/updateTask",
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

      await axios.delete("http://localhost:3000/todo/deleteTask", {
        data: deleteTaskDto,
      });

      const taskIndex = this.tasks.findIndex((t) => t.id === taskId);

      this.tasks.splice(taskIndex, 1);
    },

    async updateTaskText(task: UpdateTaskDto) {
      const response = await axios.put(
        "http://localhost:3000/todo/updateTask",
        task
      );

      const updatedTask = response.data;

      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

      this.tasks[taskIndex] = updatedTask;
    },
  },
});
