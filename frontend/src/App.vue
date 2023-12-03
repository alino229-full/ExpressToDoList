<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppNotification from "@/components/AppNotification.vue";
</script>

<template>
  <RouterView />
  <app-notification />
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: center;
}

header h1 {
  margin: 0;
}

nav button {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
}

nav button:hover {
  background-color: #0056b3;
}

main {
  padding: 2rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #007bff;
  color: white;
}
/* Style de base pour les formulaires */
form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  max-width: 400px;
  margin: auto;
}

/* Style pour les inputs et textareas */
form input[type="text"],
form input[type="email"],
form input[type="password"],
form input[type="date"],
form textarea {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

/* Style pour les boutons */
form button {
  padding: 0.5rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.3s;
}
</style>
