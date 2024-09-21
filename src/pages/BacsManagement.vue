<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Frequence</th>
          <th>Prochaine date</th>
          <th>
            <div class="actionCol" style="justify-content: space-between"><span style="font-weight: bold">Action</span> <IconPlus class="icon" @click="openAddBacModal()" /></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(b, index) in $bacs">
          <td>{{ b.idbacs }}</td>
          <td>{{ b.frequence }}</td>
          <td>{{ b.nextdate }}</td>
          <td>
            <div class="actionCol">
              <IconEdit class="icon" @click="openUpdateBacModal(index)" />
              <IconTrash class="icon" @click="_deleteBac(index)" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ModalBacs :isOpen="showModalBacs" :modalData="updateBacsData" @update:isOpen="showModalBacs = $event" />
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { deleteBac } from "@/api";

import IconPlus from "@/assets/icons/IconPlus.vue";
import IconEdit from "@/assets/icons/IconEdit.vue";
import IconTrash from "@/assets/icons/IconTrash.vue";
import ModalBacs from "@/components/ModalBacs.vue";

const { proxy } = getCurrentInstance();

const showModalBacs = ref(false);
const updateBacsData = ref({ isUpdate: false, index: -1 });

const openAddBacModal = () => {
  updateBacsData.value = { isUpdate: false, index: -1 };
  showModalBacs.value = true;
};
const openUpdateBacModal = (index) => {
  updateBacsData.value = { isUpdate: true, index: index };
  showModalBacs.value = true;
};

const _deleteBac = (index) => {
  if (window.confirm("Voulez-vous vraiment supprimer ce bac ?")) {
    deleteBac(proxy.$bacs[index].idbacs).then(() => {
      proxy.$bacs.splice(index, 1);
    });
  }
};
</script>

<style scoped></style>
