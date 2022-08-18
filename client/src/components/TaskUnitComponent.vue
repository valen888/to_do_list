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
  <div class="taskUnit">
    <input
      type="checkbox"
      :checked="task.isDone"
      @click="handleCheckedTask(task)"
    />

    <div v-if="!isBeingRenamed" class="textField">
      <span
        @dblclick="openRenameMode"
        :style="task.isDone ? `text-decoration: line-through` : ''"
      >
        {{ task.text }}</span
      >
    </div>

    <div v-else class="inputBox">
      <input
        ref="inputText"
        class="inputField"
        type="text"
        v-model="taskText"
        @keyup.enter="closeRenameMode(task)"
        @blur="closeRenameMode(task)"
      />
    </div>

    <div @click="handleRemoveClick(task.id)" class="crossSymbol"></div>
  </div>
</template>

<style scoped>
.crossSymbol {
  display: flex;
  align-items: center;
}
.crossSymbol::after {
  content: "\00d7";
  font-size: 2rem;
}
.textField {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.inputBox {
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.inputField {
  background-color: #464757;
  border: 0px;
  color: white;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.taskUnit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid;
  border-color: #464757;
  background-color: #464757;
  border-radius: 5px;
  height: 50px;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
