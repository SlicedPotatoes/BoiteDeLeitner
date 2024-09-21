<template>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>Nom</th>
        <th>Module</th>
        <th style="width: fit-content">Nombre de carte</th>
        <th>
          <div class="actionCol" style="justify-content: space-between"><span style="font-weight: bold">Action</span> <IconPlus class="icon" @click="openAddModalDeck" /></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>null</td>
        <td>default</td>
        <td></td>
        <td>{{ $defaultDeck.cartes.length }}</td>
        <td><IconCard class="icon" @click="openCardManagement(null)" /></td>
      </tr>
      <tr v-for="(d, index) in $decks" :key="index">
        <td>{{ d.iddeck }}</td>
        <td>{{ d.nom }}</td>
        <td>{{ d.module }}</td>
        <td>{{ d.nbcarte }}</td>
        <td>
          <div class="actionCol">
            <IconEdit class="icon" @click="openUpdateModalDeck(index)" />
            <IconCard class="icon" @click="openCardManagement(index)" />
            <IconTrash class="icon" @click="_deleteDeck(index)" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <ModalDeck :isOpen="showModalDeck" :modalData="updateDeckData" @update:isOpen="showModalDeck = $event" />
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { deleteDeck } from "@/api";

import IconPlus from "@/assets/icons/IconPlus.vue";
import IconEdit from "@/assets/icons/IconEdit.vue";
import IconCard from "@/assets/icons/IconCard.vue";
import IconTrash from "@/assets/icons/IconTrash.vue";
import ModalDeck from "@/components/ModalDeck.vue";

const { proxy } = getCurrentInstance();

const showModalDeck = ref(false);
const updateDeckData = ref({ isUpdate: false, index: -1 });

// Fonction pour ouvrir la modal deck en mode ajout
const openAddModalDeck = () => {
  updateDeckData.value = { isUpdate: false, index: -1 };
  showModalDeck.value = true;
};
// Fonction pour ouvrir la modal deck en mode edition
const openUpdateModalDeck = (index) => {
  updateDeckData.value = { isUpdate: true, index: index };
  showModalDeck.value = true;
};
// Fonction pour passer a la page de gestion des cartes
const openCardManagement = (index) => {
  proxy.$selectedDeck.value = index;
  proxy.$currPage.value = "cards";
};
// Fonction pour supprimer un deck
const _deleteDeck = (index) => {
  if (window.confirm("Voulez-vous vraiment supprimer ce deck ?")) {
    deleteDeck(proxy.$decks[index].iddeck).then(() => {
      proxy.$decks.splice(index, 1);
    });
  }
};
</script>

<style scoped></style>
