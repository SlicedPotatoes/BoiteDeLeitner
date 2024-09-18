<template>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Module</th>
        <th style="width: fit-content">Nombre de carte</th>
        <th><span style="font-weight: bold">Action</span> <IconPlus class="icon icon-add" @click="openAddModalDeck" /></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(d, index) in decks">
        <td>{{ d.name }}</td>
        <td>{{ d.module }}</td>
        <td>{{ d.cards.length }}</td>
        <td><IconEdit class="icon" @click="openUpdateModalDeck(index)" /> {{ d.id }}</td>
      </tr>
    </tbody>
  </table>

  <ModalDeck :isOpen="showModalDeck" :modalData="updDD" @update:isOpen="showModalDeck = $event" @addDeck="addDeck" @updateDeck="updateDeck" />
</template>

<script setup>
import { ref } from "vue";

import IconPlus from "../assets/icons/IconPlus.vue";
import IconEdit from "../assets/icons/IconEdit.vue";
import ModalDeck from "../components/ModalDeck.vue";

const decks = ref([
  { id: 0, name: "Mathématiques discrètes", module: "R106", cards: [0, 1, 2, 3, 4, 5] },
  { id: 1, name: "Anglais", module: "", cards: [0, 1, 2, 3, 4] },
  { id: 2, name: "Bases de la communication", module: "R111", cards: [0, 1, 2, 3] },
  { id: 3, name: "Algo-Prog", module: "R101", cards: [0, 1, 2] },
  { id: 4, name: "Introduction à l'architecture des ordinateurs", module: "R103", cards: [0, 1] },
]);

const showModalDeck = ref(false);
const updDD = ref({ isUpdate: false, index: -1, id: -1, name: "", module: "" }); // Data du deck en cour d'edition

// Fonction pour ajouter un deck a l'affichage
const addDeck = ($event) => {
  decks.value.push($event);
};
// Fonction pour modifier un deck a l'affichage
const updateDeck = ($event) => {
  decks.value[updDD.value.index].name = $event.name;
  decks.value[updDD.value.index].module = $event.module;
};
// Fonction pour ouvrir la modal deck en mode ajout
const openAddModalDeck = () => {
  updDD.value = { isUpdate: false, index: -1, id: -1, name: "", module: "" };
  showModalDeck.value = true;
};
// Fonction pour ouvrir la modal deck en mode edition
const openUpdateModalDeck = (index) => {
  updDD.value = { isUpdate: true, index: index, id: decks.value[index].id, name: decks.value[index].name, module: decks.value[index].module };
  showModalDeck.value = true;
};
</script>

<style scoped>
table {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

  border-collapse: collapse;
  width: 100%;
  background-color: #1f1f1f;

  border-radius: 0.5rem;
  border: solid 1px blue;
  overflow: hidden;
}
th,
td {
  border: solid 1px #404040;
  padding: 8px 10px;
}
thead th {
  font-weight: bold;
  text-align: left;
}

.icon {
  width: 1rem;
  cursor: pointer;
  fill: rgba(235, 235, 235, 0.64);
}
.icon-add {
  float: right;
  transform: translate(0, 3px);
}
</style>
