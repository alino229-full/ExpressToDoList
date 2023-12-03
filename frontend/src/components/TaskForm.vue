<template>
  <div class="container">
    <BaseInput v-model="form.title" placeholder="Entrer le titre de la tâche"/>
    <BaseTextarea v-model="form.description" placeholder="Entrer la description de la tâche"></BaseTextarea>
    <BaseInput type="date" v-model="form.deadline" placeholder="Choisir la date d'échéance"/>
    <BaseButton @click="saveTask" class="mt-4">Cliquez ici</BaseButton>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseTextarea from '@/components/BaseTextarea.vue';
import BaseButton from '@/components/BaseButton.vue';
import type {Task} from '@/types/task';
import useNotification from "@/composable/useNotification";

const { addNotification } = useNotification();
const form = ref<Task>({
  title: '',
  description: '',
  deadline: '',
  id: undefined,
  status: false,
});

const emit = defineEmits(['task-saved']);
const props = defineProps<{ task: Task | null }>();

const saveTask = async () => {
  if (!form.value.title || !form.value.description || !form.value.deadline) {


    addNotification({
      message:"Veuillez remplir tous les champs.",
      type: "error",
      icon: true,
      timeout: 5000,
    });
    return;
  }
  emit('task-saved', form.value);

  form.value.title = '';
  form.value.description = '';
}

watch(() => props.task, (newTask) => {
  if (newTask) {
    form.value = { ...newTask }; // Crée un nouvel objet
  }
}, { immediate: true });
</script>


<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}
</style>
