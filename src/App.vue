<template>
  <Topbar />
  <div style="padding: 1rem">
    <component :is="currentPageComponent" />
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

import Topbar from "./components/Topbar.vue";

import DeckManagement from "./pages/DeckManagement.vue";

const { proxy } = getCurrentInstance();

const currentPageComponent = computed(() => {
  switch (proxy.$currPage.value) {
    case "home":
      return null;
    case "decks":
      return DeckManagement;
    default:
      return null;
  }
});
</script>

<style scoped></style>
