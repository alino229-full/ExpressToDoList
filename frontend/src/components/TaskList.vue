<template>

  <section id="taskList" class="space-y-4 px-4 mx-auto ">
    <h1 class="text-gray-800 font-bold text-2xl uppercase">Liste des Tâches</h1>

    <!-- Affiche les tâches si la liste n'est pas vide -->
    <template v-if="tasks.length > 0">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </template>

    <!-- Message si la liste des tâches est vide -->
    <p v-else class="text-gray-600 italic">Aucune tâche existante.</p>
  </section>


</template>

<script setup>

import TaskItem from './TaskItem.vue';

// Définition des props
const props = defineProps({
  tasks: {
      type:   Object,
    required: true,
  },
});


</script>

