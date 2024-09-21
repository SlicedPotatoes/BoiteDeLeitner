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
            <span>Frequence</span>
            <input v-model="form.frequence" type="number" placeholder="Saisir la frequence..." />
          </div>
          <div class="container-input">
            <span>Prochaine date</span>
            <input v-model="form.nextdate" type="date" />
          </div>
          <button @click="clickBtn">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, getCurrentInstance } from "vue";
import { addBac, updateBac } from "@/api";

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
  frequence: "",
  nextdate: "",
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
      let b = proxy.$bacs[newValue.index];
      form.value = { frequence: b.frequence, nextdate: b.nextdate };
    } else {
      form.value = { frequence: "", nextdate: "" };
    }
  },
  { immediate: true }
);

const computedTitle = computed(() => {
  return (isUpdate.value ? "Modifier" : "Ajouter") + " un bac";
});

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
  let b = await addBac({ frequence: form.value.frequence, nextdate: form.value.nextdate });
  proxy.$bacs.push(b);
};
// Fonction pour modifier un deck
const update = async () => {
  let b = await updateBac(proxy.$bacs[props.modalData.index].idbacs, { frequence: form.value.frequence, nextdate: form.value.nextdate });
  proxy.$bacs[props.modalData.index] = b;
};
</script>

<style scoped></style>
