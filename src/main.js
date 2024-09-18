import "./assets/main.css";

import { createApp, reactive } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.config.globalProperties.$token = reactive({ value: "t" });
app.config.globalProperties.$currPage = reactive({ value: "home" });

app.mount("#app");
