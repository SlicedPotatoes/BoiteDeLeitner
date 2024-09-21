import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { bacs, currPage, decks, defaultDeck, selectedDeck } from "./storage.js";

const app = createApp(App);

app.config.globalProperties.$currPage = currPage;
app.config.globalProperties.$decks = decks;
app.config.globalProperties.$defaultDeck = defaultDeck;
app.config.globalProperties.$bacs = bacs;
app.config.globalProperties.$selectedDeck = selectedDeck;

console.log(defaultDeck);

app.mount("#app");
