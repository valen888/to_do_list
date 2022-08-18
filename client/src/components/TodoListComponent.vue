<script setup lang="ts">
import Task from "../models/interface/task.interface";
import PendingTasksComponent from "./PendingTasksComponent.vue";
import AddTaskComponent from "./AddTaskComponent.vue";
import DoneTasksComponents from "./DoneTasksComponents.vue";
import { inject } from "vue";

import { store } from "../stores/store";
import { storeToRefs } from "pinia";
import UpdateTaskDto from "../models/dto/update-task.dto";

const emitter: any = inject("emitter");

const storage = store();
const { pendingTasks, doneTasks } = storeToRefs(storage);

emitter.on("taskRechecked", (task: Task) => {
  storage.changeTaskStatus(task);
});

emitter.on("taskRemoved", async (taskId: string) => {
  await storage.removeTask(taskId);
});

emitter.on("taskTextUpdated", (task: UpdateTaskDto) => {
  storage.updateTaskText(task);
});

await storage.initTasks();

pendingTasks.value = storage.pendingTasks;
doneTasks.value = storage.doneTasks;
</script>

<template>
  <div class="mainContainer">
    <div class="listContainer">
      <h3>To-do list</h3>
      <AddTaskComponent class="totalWidth" />
      <br />
      <PendingTasksComponent :pendingTasks="pendingTasks" class="totalWidth" />
      <hr class="totalWidth" />
      <div class="totalWidth">
        <div class="completedDiv">
          <div class="tickSymbol"></div>
          Completed
        </div>
      </div>
      <DoneTasksComponents :doneTasks="doneTasks" class="totalWidth" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40rem;

  > .listContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > .totalWidth {
      width: 40%;

      > .completedDiv {
        display: flex;
        width: 20%;
        background-color: rgba(67, 116, 221, 0.391);
        border-color: #464757;
        padding-left: 5px;
        border-radius: 5px;

        > .tickSymbol {
          padding-right: 5px;

          &:after {
            content: "\2713";
          }
        }
      }
    }
  }
}
</style>
