<template>
  <div>
    <h1>{{ computedTitle }}</h1>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Question</th>
          <th>
            <div class="actionCol" style="font-weight: bold">
              Réponse
              <IconShow class="icon" @click="toggleAnswers(false)" />
              <IconHidde class="icon" @click="toggleAnswers(true)" />
            </div>
          </th>
          <th>Bac</th>
          <th>
            <div class="actionCol" style="justify-content: space-between"><span style="font-weight: bold">Action</span> <IconPlus class="icon" @click="openAddModalDeck" /></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, index) in computedDeck.cartes">
          <td>{{ c.idcarte }}</td>
          <td v-html="c.question" />
          <td>
            <div class="container-answer">
              <div class="answer-foreground" :class="{ 'is-hidden': isHidden[index] }" @click="isHidden[index] = !isHidden[index]" />
              <div class="answer" v-html="c.reponse" />
            </div>
          </td>
          <td>{{ c.idbacs }}</td>
          <td>
            <div class="actionCol">
              <IconEdit class="icon" @click="openUpdateModalCard(index)" />
              <IconTrash class="icon" @click="_deleteCard(index)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ModalCard :isOpen="showModalCard" :modalData="updateCardData" @update:isOpen="showModalCard = $event" />
</template>

<script setup>
import { ref, getCurrentInstance, computed, onBeforeMount } from "vue";
import { deleteCard } from "@/api";

import IconPlus from "@/assets/icons/IconPlus.vue";
import IconEdit from "@/assets/icons/IconEdit.vue";
import IconTrash from "@/assets/icons/IconTrash.vue";
import IconShow from "@/assets/icons/IconShow.vue";
import IconHidde from "@/assets/icons/IconHidde.vue";
import ModalCard from "@/components/ModalCard.vue";

const { proxy } = getCurrentInstance();

const showModalCard = ref(false);
const updateCardData = ref({ isUpdate: false, index: -1 }); // Data de la card en cour d'edition
const isHidden = ref([]);

onBeforeMount(() => {
  for (let i = 0; i < getDeck().cartes.length; i++) {
    isHidden.value.push(true);
  }
});

// Fonction qui récupère le deck selectionné
const getDeck = () => {
  if (proxy.$selectedDeck.value == null) return proxy.$defaultDeck;
  return proxy.$decks[proxy.$selectedDeck.value];
};
// Fonction pour ouvrir la modal card en mode ajout
const openAddModalDeck = () => {
  updateCardData.value = { isUpdate: false, index: -1 };
  showModalCard.value = true;
};
// Fonction pour ouvrir la modal deck en mode edition
const openUpdateModalCard = (index) => {
  updateCardData.value = { isUpdate: true, index: index };
  showModalCard.value = true;
};
// Fonction pour supprimer une carte
const _deleteCard = (index) => {
  if (window.confirm("Voulez-vous vraiment supprimer ce deck ?")) {
    deleteCard(getDeck().cartes[index].idcarte).then(() => {
      getDeck().cartes.splice(index, 1);
      getDeck().nbcarte--;
    });
  }
};
// Fonction pour cacher ou montrer les réponses
const toggleAnswers = (value) => {
  for (let i = 0; i < isHidden.value.length; i++) {
    isHidden.value[i] = value;
  }
};

const computedTitle = computed(() => {
  return "Deck: " + getDeck().nom;
});
const computedDeck = computed(() => {
  return getDeck();
});
</script>

<style scoped>
.container-answer {
  position: relative;
  width: fit-content;
}
.answer-foreground {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  transition: background-color 0.5s ease;
  cursor: pointer;
}
.is-hidden {
  background-color: #313338;
}
.answer {
  z-index: 1;
}
</style>
