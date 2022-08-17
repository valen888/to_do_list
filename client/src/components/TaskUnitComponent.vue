<script setup props lang="ts">
import { inject, nextTick, onMounted, ref } from "vue";
import UpdateTaskDto from "../models/dto/update-task.dto";
import Task from "../models/interface/task.interface";

const props = defineProps<{ task: Task }>();

const emitter: any = inject("emitter");

let isBeingRenamed = ref(false);

let taskText = ref("");

function handleCheckedTask(task: Task) {
  emitter.emit("taskRechecked", task);
}

function handleRemoveClick(taskId: string) {
  emitter.emit("taskRemoved", taskId);
}

const inputText: any = ref(null);

onMounted(() => {
  taskText.value = props.task.text;
});

function openRenameMode() {
  isBeingRenamed.value = true;

  if (isBeingRenamed.value) {
    nextTick(() => {
      inputText.value.focus();
    });
  }
}

async function closeRenameMode(task: Task) {
  isBeingRenamed.value = false;

  const newText = taskText.value;

  const newTask: UpdateTaskDto = {
    id: task.id,
    isDone: task.isDone,
    text: newText,
  };

  emitter.emit("taskTextUpdated", newTask);
}
</script>

<template>
  <div>
    <input
      type="checkbox"
      :checked="task.isDone"
      @click="handleCheckedTask(task)"
    />

    <span v-if="!isBeingRenamed">
      <span @dblclick="openRenameMode"> {{ task.text }}</span>
      <span @click="handleRemoveClick(task.id)"> &#10006;</span></span
    >
    <input
      ref="inputText"
      v-else
      type="text"
      v-model="taskText"
      @keyup.enter="closeRenameMode(task)"
      @blur="closeRenameMode(task)"
    />
  </div>
</template>

<style scoped></style>
