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
            <input v-model="form.name" type="text" placeholder="Saisir le nom..."></input>
          </div>
          <div class="container-input">
            <span>Module</span>
            <input v-model="form.module" type="text" placeholder="Saisir le module..."></input>
          </div>
          <button @click="clickBtn">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref, computed } from "vue";

// Déclaration des props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  modalData: {
    type: Object,
    required: true,
    default: () => ({ isUpdate: false, index: -1, id: -1, name: "", module: "" })
  }
});

// Décraration des events
const emit = defineEmits(["update:isOpen", "addDeck", "updateDeck"]);

// Déclaration des variable reactive
const isModalOpen = ref(props.isOpen);

const isUpdate = ref(props.modalData.isUpdate);
const form = ref({
  id: props.modalData.id,
  name: props.modalData.name,
  module: props.modalData.module
});

// Synchroniser les variable reactive avec la prop
watch(() => props.isOpen, (newValue) => {
  isModalOpen.value = newValue;
});
watch(() => props.modalData, (newValue) => {
  isUpdate.value = newValue.isUpdate
  form.value = {id: newValue.id, name: newValue.name, module: newValue.module}
}, {immediate: true});

const computedTitle = computed(() => {
  return (isUpdate.value ? "Modifier" : "Ajouter") + " un deck";
});

// Fonction pour fermer la modal
const closeModal = () => {
  emit("update:isOpen", false);
};
// Fonction ClickBtn
const clickBtn = () => {
  if(isUpdate.value){
    updateDeck();
  }
  else{
    addDeck();
  }
  closeModal();
}
// Fonction pour ajouter un deck
const addDeck = () => {
  // let id = api.deck.add({name: name.value, module: module.value})
  emit("addDeck", {id: 0, name: form.value.name, module: form.value.module, cards: []})
};
// Fonction pour modifier un deck
const updateDeck = () => {
  // Call API
  emit("updateDeck", {name: form.value.name, module: form.value.module});
}
</script>

<style scoped>
/* Styles pour la modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}
.modal-header {
  padding: 2px 16px;
  background-color: #181818;
  border-bottom: solid 1px #404040;
  color: white;
}
.modal-body {
  background: #1f1f1f;
  padding: 1rem;
}
.close-button {
  position: absolute;
  top: 0px;
  right: 8px;
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
}

/* Style Content */
.container-input{
  display: flex; 
  flex-direction:column;
  gap: 2px;
}
.container-flex{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>
