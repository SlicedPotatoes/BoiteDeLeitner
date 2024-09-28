import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { currPage, decks, defaultDeck, selectedDeck, dayliCard } from "./storage.js";

const app = createApp(App);

app.config.globalProperties.$currPage = currPage;
app.config.globalProperties.$decks = decks;
app.config.globalProperties.$defaultDeck = defaultDeck;
app.config.globalProperties.$selectedDeck = selectedDeck;
app.config.globalProperties.$dayliCard = dayliCard;

app.mount("#app");
