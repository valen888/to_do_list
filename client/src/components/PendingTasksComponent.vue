<script setup lang="ts">
import Task from "../models/interface/task.interface";
import TaskUnitComponent from "./TaskUnitComponent.vue";

defineProps<{ pendingTasks: Task[] }>();
</script>

<template>
  <div>
    <div v-for="task in pendingTasks" :key="JSON.stringify(task.id)">
      <TaskUnitComponent :task="task" />
    </div>
  </div>
</template>
