<script setup lang="ts">
import TodoListComponent from "./components/TodoListComponent.vue";
</script>

<template>
  <Suspense>
    <TodoListComponent />

    <template #fallback> Loading... </template>
  </Suspense>
</template>

<style scoped></style>
