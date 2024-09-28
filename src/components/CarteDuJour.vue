<template>
  <div class="container" style="justify-content: space-between" v-if="currIndex < props.data.cartes.length">
    <div class="header">
      <span class="titlePage">Question du jour #{{ currIndex + 1 }}</span>
      <div class="container-tag">
        <div class="tag">{{ computedGetDeck.nom }}</div>
        <div v-if="computedGetDeck.module" class="tag">{{ computedGetDeck.module }}</div>
      </div>
    </div>

    <div class="container-data" v-html="props.data.cartes[currIndex].question" />
    <div class="container-data" v-if="showAnswer" v-html="props.data.cartes[currIndex].reponse" />

    <button v-if="!showAnswer" @click="showAnswer = true">Voir la réponse</button>
    <div v-if="showAnswer" class="container-flex btn" style="flex-direction: row">
      <button @click="updCard(true)">Juste</button>
      <button @click="updCard(false)">Faux</button>
    </div>
  </div>

  <div class="container" style="justify-content: center" v-else>
    <span class="titlePage">Plus de question dans ce bac</span>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from "vue";
import { updateCard } from "@/api";
import { getDateWithOffset } from "@/globalFunc";

const { proxy } = getCurrentInstance();

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({ level: 0, cartes: [] }),
  },
});

const currIndex = ref(0);
const showAnswer = ref(false);

// Fonction pour trouvé l'index d'un deck avec son id
const computedGetDeck = computed(() => {
  console.log("computedGetDeck", props.data.cartes[currIndex.value]);
  console.log("computedGetDeck", proxy.$decks);
  console.log(proxy.$decks.find((deck) => deck.iddeck === props.data.cartes[currIndex.value].iddeck));
  return proxy.$decks.find((deck) => deck.iddeck === props.data.cartes[currIndex.value].iddeck);
});

const updCard = (isCorrect) => {
  let card = props.data.cartes[currIndex.value];

  console.log(card);
  if (isCorrect) {
    if (card.level < 7) {
      updateCard(card.idcarte, { level: card.level + 1, nextReponse: getDateWithOffset(new Date(), Math.pow(2, card.level + 1)) });
    }
  } else {
    updateCard(card.idcarte, { level: 0, nextReponse: getDateWithOffset(new Date(), 1) });
  }

  showAnswer.value = false;
  currIndex.value++;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #404040;
  border-radius: 0.5rem;
  background-color: #1f1f1f;
  padding: 1rem;
  height: 100%;
  width: 100%;
  text-align: center;
}
.container-tag {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.tag {
  background-color: #404040;
  padding: 0.2rem 0.5rem;
  border-radius: 0.75rem;
  height: fit-content;
}
.header {
  position: relative;
  width: 100%;
  height: fit-content;
}
.titleHeader {
  height: fit-content;
}
.container-data {
  font-size: 1.75rem;
}
.btn {
  flex-direction: row;
  width: 100%;
  justify-content: center;
}
</style>
