<template>
  <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>{{ computedTitle }}</h2>
      </div>
      <div class="modal-body">
        <div class="container-flex">
          <div class="container-input">
            <span>Nom</span>
            <input v-model="form.nom" type="text" placeholder="Saisir le nom..." />
          </div>
          <div class="container-input">
            <span>Module</span>
            <input v-model="form.module" type="text" placeholder="Saisir le module..." />
          </div>
          <button @click="clickBtn">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, getCurrentInstance } from "vue";
import { addDeck, updateDeck } from "@/api";

const { proxy } = getCurrentInstance();

// Déclaration des props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  modalData: {
    type: Object,
    required: true,
    default: () => ({ isUpdate: false, index: -1 }),
  },
});

// Décraration des events
const emit = defineEmits(["update:isOpen"]);

// Déclaration des variable reactive
const isModalOpen = ref(props.isOpen);

const isUpdate = ref(props.modalData.isUpdate);
const form = ref({
  nom: "",
  module: "",
});

// Synchroniser les variable reactive avec la prop
watch(
  () => props.isOpen,
  (newValue) => {
    isModalOpen.value = newValue;
  }
);
watch(
  () => props.modalData,
  (newValue) => {
    isUpdate.value = newValue.isUpdate;
    if (newValue.index != -1) {
      let deck = proxy.$decks[newValue.index];
      form.value = { nom: deck.nom, module: deck.module };
    } else {
      form.value = { nom: "", module: "" };
    }
  },
  { immediate: true }
);

const computedTitle = computed(() => {
  return (isUpdate.value ? "Modifier" : "Ajouter") + " un deck";
});

// Fonction pour fermer la modal
const closeModal = () => {
  emit("update:isOpen", false);
};
// Fonction ClickBtn
const clickBtn = () => {
  if (isUpdate.value) {
    _updateDeck();
  } else {
    _addDeck();
  }
  closeModal();
};
// Fonction pour ajouter un deck
const _addDeck = async () => {
  let d = await addDeck({ nom: form.value.nom, module: form.value.module });
  proxy.$decks.push(d);
};
// Fonction pour modifier un deck
const _updateDeck = async () => {
  let cartes = proxy.$decks[props.modalData.index].cartes;
  let d = await updateDeck(proxy.$decks[props.modalData.index].iddeck, { nom: form.value.nom, module: form.value.module });
  d.cartes = cartes;
  proxy.$decks[props.modalData.index] = d;
};
</script>

<style scoped></style>
