<template>
  <div class="task bg-white p-4 rounded shadow border-l-4 border-red-500">
    <h2 @click="toggleDescription" class="font-bold cursor-pointer">
      {{ task.title }}
    </h2>
    <transition name="fade">
      <p v-if="showDescription" class="mb-2">
        {{ task.description }}
      </p>
    </transition>
    <p class="mb-2">Date d'échéance: {{ formatDeadline(task.deadline) }}</p>
    <p :class="{'text-green-500': task.status, 'text-red-500': !task.status}" class="mb-2">
      Statut: {{ task.status ? 'Complété' : 'En cours' }}
    </p>
    <div class="flex space-x-4">
      <button @click="onEdit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
        Modifier
      </button>
      <button @click="onDelete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
        Supprimer
      </button>
      <label class="flex items-center cursor-pointer">
        <!-- toggle -->
        <div class="relative">
          <!-- input -->
          <input type="checkbox" class="sr-only" @change="onToggleStatus($event)" v-model="task.status" />
          <!-- line -->
          <div class="block bg-teal-900 w-14 h-8 rounded-full"></div>
          <!-- dot -->
          <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
        <!-- label -->

      </label>
    </div>
  </div>
</template>

<script setup>
import { ref,inject } from 'vue';


const props = defineProps({
  task: Object
});



const showDescription = ref(false);

const editTask = inject('editTask');
const deleteTask = inject('deleteTask');
const toggleStatus = inject('changeTaskStatus');

const onEdit = () => {
  if (editTask) {
    editTask(props.task);
  }
};

const onDelete = () => {
  if (deleteTask) {
    deleteTask(props.task.id);
  }
};

const onToggleStatus = (event) => {
  const isChecked = event.target.checked;

    toggleStatus(props.task.id,isChecked);

};
const toggleDescription = () => {
  showDescription.value = !showDescription.value;
};
function formatDeadline(deadline) {
  if (!deadline) return 'Non définie';
  const date = new Date(deadline);
  return date.toLocaleDateString(); // Tu peux ajuster le formatage ici
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* Ajouter ces styles à votre fichier CSS personnalisé si nécessaire */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #4ade80;
}
</style>