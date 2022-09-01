<script setup lang="ts">
import ITask from "../models/interface/task.interface";
import Task from "../components/Task.vue";

defineProps<{ tasks: ITask[] }>();
</script>

<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <Task :task="task" />
    </div>
  </div>
</template>
