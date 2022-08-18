<script setup lang="ts">
import { ref } from "vue";
import { store } from "../stores/store";
import AddTaskDto from "../models/dto/add-task.dto";

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

<style lang="scss" scoped>
.addTask {
  border: 1px solid;
  border-radius: 5px;
  border-color: #464757;
  display: flex;
  flex-direction: row;
  align-items: center;

  > .plusSymbol {
    width: 5%;
    padding-left: 10px;

    &:after {
      content: "+";
      font-size: 35px;
    }
  }

  > .inputField {
    width: 95%;
    background-color: #2b2d3b;
    border-radius: 5px;
    border: 0px;
    color: white;
    height: 50px;
    padding-left: 20px;
    padding-right: 10px;
  }
}
</style>
