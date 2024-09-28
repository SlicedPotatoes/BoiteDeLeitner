<template>
  <div class="container">
    <Topbar />
    <div class="content">
      <component :is="currentPageComponent" />
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

import Topbar from "./components/Topbar.vue";

import Home from "./pages/Home.vue";
import DeckManagement from "./pages/DeckManagement.vue";
import CardManagement from "./pages/CardManagement.vue";

const { proxy } = getCurrentInstance();

const currentPageComponent = computed(() => {
  switch (proxy.$currPage.value) {
    case "home":
      return Home;
    case "decks":
      return DeckManagement;
    case "cards":
      return CardManagement;
    default:
      return null;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
  height: 100%;
}
</style>
