import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import mitt from "mitt";
const emitter = mitt();

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.provide("emitter", emitter);
app.mount("#app");
