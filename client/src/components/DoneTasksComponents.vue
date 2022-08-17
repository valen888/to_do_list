<script setup lang="ts">
import Task from "../models/interface/task.interface";
import TaskUnitComponent from "./TaskUnitComponent.vue";

defineProps<{ doneTasks: Task[] }>();
</script>

<template>
  <div>
    <h3>DONE TASKS</h3>
    <div v-for="task in doneTasks" :key="JSON.stringify(task.id)">
      <TaskUnitComponent :task="task" />
    </div>
  </div>
</template>

<style scoped></style>
