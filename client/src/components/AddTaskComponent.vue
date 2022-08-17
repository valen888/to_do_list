<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import AddTaskDto from "../models/dto/add-task.dto";
import { store } from "../stores/store";
const storage = store();

let text = ref("Add task");

async function onClicked(e: any) {
  e.preventDefault();

  const addTaskDto: AddTaskDto = { text: text.value };

  const response = await axios.post(
    "http://localhost:3000/todo/addTask",
    addTaskDto
  );

  storage.addNewTask(response.data);
}
</script>

<template>
  <div>
    <h3>ADD TASK</h3>

    <form>
      <label>Text:</label>
      <input type="text" name="name" v-model="text" />
      <br /><br />

      <input type="submit" @click="onClicked" />
    </form>
  </div>
</template>

<style scoped></style>
