<script setup lang="ts">
import { ref } from "vue";
import AddTaskDto from "../models/dto/add-task.dto";
import { store } from "../stores/store";

const storage = store();

let text = ref("");

async function addTask() {
  const textValue = text.value;

  const addTaskDto: AddTaskDto = {
    text: textValue.length === 0 ? "Empty task" : textValue,
  };

  await storage.addNewTask(addTaskDto);
}
</script>

<template>
  <div class="addTask">
    <div class="plusSymbol" @click="addTask"></div>
    <input
      type="text"
      name="name"
      v-model="text"
      placeholder="Add a task"
      class="inputField"
    />
  </div>
</template>

<style scoped>
.plusSymbol::after {
  content: "+";
  font-size: 35px;
}

.plusSymbol {
  width: 5%;
  padding-left: 10px;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.inputField {
  width: 95%;
  background-color: #2b2d3b;
  border-radius: 5px;
  border: 0px;
  color: white;
  height: 50px;
  padding-left: 20px;
  padding-right: 10px;
}
.addTask {
  border: 1px solid;
  border-radius: 5px;
  border-color: #464757;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
