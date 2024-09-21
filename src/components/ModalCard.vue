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
            <span>Question</span>
            <input v-model="form.question" type="text" placeholder="Saisir la question..." />
          </div>
          <div class="container-input">
            <span>Réponse</span>
            <input v-model="form.reponse" type="text" placeholder="Saisir la réponse..." />
          </div>
          <div class="container-input">
            <span>Deck</span>
            <select v-model="form.iddeck" v-if="isUpdate">
              <option v-for="d in $decks" :value="d.iddeck">{{ d.nom }}</option>
            </select>
          </div>
          <button @click="clickBtn">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, getCurrentInstance } from "vue";
import { addCard, updateCard } from "@/api";

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
  question: "",
  reponse: "",
  iddeck: -1,
});

const computedTitle = computed(() => {
  return (isUpdate.value ? "Modifier" : "Ajouter") + " une carte";
});

// Fonction qui récupère le deck selectionné
const getDeck = () => {
  if (proxy.$selectedDeck.value == null) return proxy.$defaultDeck;
  return proxy.$decks[proxy.$selectedDeck.value];
};
// Fonction pour fermer la modal
const closeModal = () => {
  emit("update:isOpen", false);
};
// Fonction ClickBtn
const clickBtn = () => {
  if (isUpdate.value) {
    update();
  } else {
    add();
  }
  closeModal();
};
// Fonction pour ajouter un deck
const add = async () => {
  let c = await addCard({ question: form.value.question, reponse: form.value.reponse, iddeck: form.value.iddeck });

  console.log(getDeck().cartes);

  getDeck().cartes.splice(0, 0, c);
  getDeck().nbcarte++;
};
// Fonction pour modifier un deck
const update = async () => {
  let c = await updateCard(getDeck().cartes[props.modalData.index].idcarte, { question: form.value.question, reponse: form.value.reponse, iddeck: form.value.iddeck });

  if (c.iddeck != getDeck().iddeck) {
    getDeck().cartes.splice(props.modalData.index, 1);
    getDeck().nbcarte--;
    let d = proxy.$decks.find((d) => d.iddeck == c.iddeck);
    d.cartes.push(c);
    d.nbcarte++;
  } else {
    getDeck().cartes[props.modalData.index] = c;
  }
};

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
      let card = getDeck().cartes[newValue.index];
      form.value = { question: card.question, reponse: card.reponse };
    } else {
      form.value = { question: "", reponse: "", iddeck: -1 };
    }

    form.value.iddeck = getDeck().iddeck;
  },
  { immediate: true }
);
</script>

<style scoped></style>
