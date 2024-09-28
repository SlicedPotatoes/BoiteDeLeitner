<template>
  <div class="card-bac">
    <div class="title">{{ "Bac " + (props.data.level + 1) }}</div>
    <div>Fréquence: {{ Math.pow(2, props.data.level) }}</div>
    <div>Nombre de carte: {{ props.data.cartes.length }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({ level: 0, cartes: [] }),
  },
});
</script>

<style scoped>
.card-bac {
  border: 1px solid #404040;
  border-radius: 0.5rem;
  background-color: #1f1f1f;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 116px;
  cursor: pointer;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.card-bac:hover {
  background-color: #181818;
}
.title {
  font-size: 1.15rem;
  font-weight: bold;
}
</style>
