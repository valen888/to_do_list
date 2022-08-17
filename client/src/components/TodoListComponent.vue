<script setup lang="ts">
import Task from "../models/interface/task.interface";
import PendingTasksComponent from "./PendingTasksComponent.vue";
import AddTaskComponent from "./AddTaskComponent.vue";
import DoneTasksComponents from "./DoneTasksComponents.vue";
import { inject } from "vue";

import { store } from "../stores/store";
import { storeToRefs } from "pinia";
import UpdateTaskDto from "../models/dto/update-task.dto";

const emitter: any = inject("emitter");

const storage = store();
const { pendingTasks, doneTasks } = storeToRefs(storage);

emitter.on("taskRechecked", (task: Task) => {
  storage.changeTaskStatus(task);
});

emitter.on("taskRemoved", async (taskId: string) => {
  await storage.removeTask(taskId);
});

emitter.on("taskTextUpdated", (task: UpdateTaskDto) => {
  storage.updateTaskText(task);
});

await storage.initTasks();

pendingTasks.value = storage.pendingTasks;
doneTasks.value = storage.doneTasks;
</script>

<template>
  <div>
    <h3>TO DO LIST</h3>
    <AddTaskComponent />
    <PendingTasksComponent :pendingTasks="pendingTasks" />
    <DoneTasksComponents :doneTasks="doneTasks" />
  </div>
</template>

<style scoped></style>
