<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

let smth: string = "smth";

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  {{ smth }}

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped></style>
