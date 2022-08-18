<script setup lang="ts">
import TodoListComponent from "./components/TodoListComponent.vue";
</script>

<template>
  <div class="background">
    <Suspense>
      <TodoListComponent />

      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<style scss></style>
