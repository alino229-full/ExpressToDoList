<template>
  <div class="w-full mx-auto">
    <header class="bg-blue-500 text-white flex justify-between items-center  p-4 mb-4">
      <button @click="addTaskForm" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Ajouter une Tâche
      </button>
      <!-- Bouton de déconnexion -->
      <button @click="logout()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
        Déconnexion 🔒
      </button>

    </header>


    <TaskList :tasks="tasks" />


    <transition name="fade">
      <div v-if="showTaskForm" class="modal-backdrop" @click="toggleTaskForm">
        <section class="task-form-container" @click.stop>
          <TaskForm :task="selectedTask" @task-saved="handleSave" />
        </section>
      </div>
    </transition>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive,provide } from 'vue';
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
import { useTaskManager } from '@/services/TaskManager.js';
import type { Task } from '@/types/task';
import useNotification from "@/composable/useNotification";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'

// Gestion de l'état du formulaire et de la tâche sélectionnée
const showTaskForm = ref(false);
const tasks = reactive<Task[]>([]); // Utiliser reactive pour la liste des tâches
const auth = useAuthStore();

const { addNotification } = useNotification();

const router = useRouter()
const logout = ()=>{
  auth.signOut()
  router.push('/login')

}
// Initialise selectedTask pour qu'il puisse contenir un objet Task ou null
const selectedTask = ref<Task | null>(null);

// Crée une instance du gestionnaire de tâches
const taskManager = useTaskManager();

// Récupère et met à jour la liste des tâches
const fetchAndUpdateTasks = async (): Promise<void> => {
  try {
    const fetchedTasks: Task[] = await taskManager.fetchTasks();
    if (Array.isArray(fetchedTasks)) {
      tasks.splice(0, tasks.length, ...fetchedTasks);
    } else {
      // Gère le cas où fetchedTasks n'est pas un tableau
      console.error("La réponse n'est pas un tableau de tâches");
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Autres gestions d'erreur (par exemple, mise à jour de l'état UI)
  }
};

const addTaskForm =(): void => {
  toggleTaskForm();
  selectedTask.value= {deadline: undefined, description: "", id: undefined, status: false, title: ""}
};
// Gestion des actions du formulaire et des tâches
const toggleTaskForm = (): void => {
  showTaskForm.value = !showTaskForm.value;
  // selectedTask.value= {deadline: undefined, description: "", id: undefined, status: false, title: ""}
};

const handleSave = async (task: Task): Promise<void> => {
  const action = task.id ? taskManager.updateTask : taskManager.addTask;
  await action(task);
  await fetchAndUpdateTasks();
  toggleTaskForm();
  addNotification({
    message: task.id?"Tâche mise à jours  avec succès !":"Tâche ajouté avec succès !",
    type: "success",
    icon: true,
    timeout: 5000,
  });

};

const handleEdit = (task: Task): void => {
  selectedTask.value = task;
  toggleTaskForm();

};

const handleDelete = async (taskId: number): Promise<void> => {
  await taskManager.deleteTask(taskId);
  await fetchAndUpdateTasks();
  addNotification({
    message: "Tâche supprimée avec succès !",
    type: "success",
    icon: true,
    timeout: 5000,
  });
};

const handleChangeTaskStatus = async (taskId: number,newStatus: boolean):Promise<void> => {
  console.log(taskId)
  await taskManager.updateTaskStatus(taskId,newStatus);
  addNotification({
    message: "Mise à jour du status éffectué avec succès !",
    type: "success",
    icon: true,
    timeout: 5000,
  });
}

provide('editTask', handleEdit);
provide('deleteTask', handleDelete);
provide('changeTaskStatus', handleChangeTaskStatus);

onMounted(fetchAndUpdateTasks);
</script>


<style>
.home-container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add-task-btn {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-task-btn:hover {
  background-color: #0056b3;
}

.task-form-container {
  margin-bottom: 20px;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.task-form-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  z-index: 1001;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

