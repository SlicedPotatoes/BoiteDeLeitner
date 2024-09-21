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
import CardManagement from "./pages/CardManagement.vue";
import BacsManagement from "./pages/BacsManagement.vue";

const { proxy } = getCurrentInstance();

const currentPageComponent = computed(() => {
  switch (proxy.$currPage.value) {
    case "home":
      return null;
    case "decks":
      return DeckManagement;
    case "cards":
      return CardManagement;
    case "bacs":
      return BacsManagement;
    default:
      return null;
  }
});
</script>

<style scoped></style>
