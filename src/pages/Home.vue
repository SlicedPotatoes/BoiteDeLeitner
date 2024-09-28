<template>
  <div class="container-flex" style="height: 100%">
    <div class="titlePage" style="margin-bottom: 0">Question du jour</div>
    <div class="container-bacs">
      <CardBac :class="{ active: selectedBac == index }" v-for="(bac, index) in $dayliCard" v-show="bac.cartes.length > 0" :data="bac" @click="selectedBac = index" />
    </div>
    <CarteDuJour v-if="selectedBac != -1" :data="computedSelectedBac" />
  </div>
</template>

<script setup>
import { computed, ref, getCurrentInstance } from "vue";
import CardBac from "@/components/CardBac.vue";
import CarteDuJour from "@/components/CarteDuJour.vue";

const { proxy } = getCurrentInstance();
const selectedBac = ref(-1);

const computedSelectedBac = computed(() => {
  if (selectedBac.value === -1) {
    return null;
  }

  return proxy.$dayliCard[selectedBac.value];
});
</script>

<style scoped>
.container-bacs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.active {
  border: 3px solid #404040;
}
</style>
