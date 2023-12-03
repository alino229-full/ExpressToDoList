import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import api, { setAPItoken } from "../boot/api";
import type { AxiosError, AxiosResponse } from "axios";
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // États pour le statut de connexion et l'indicateur de chargement
  const islogged = ref(false);
  const loading = ref(false);

  const me = ref({});

  const getUser = computed(() => {
    return me.value;
  });

// Computed property pour réagir aux changements de `islogged`
  const g_islogged = computed(() => islogged.value);

  /**
   * Fonction pour gérer le processus de connexion.
   * @param {Object} payload - Contient l'email et le mot de passe de l'utilisateur.
   */
  const login = async (payload) => {




    loading.value = true; // Active l'indicateur de chargement

    try {
      // Envoie une requête POST avec les données de connexion et le token CSRF
      const response = await axios.post('http://localhost:3000/users/login', {
        ...payload
      });

      // Vérifie si la réponse est réussie
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Stocke le token dans localStorage
        setAPItoken(token); // Configure le token pour les requêtes API futures
        await fetchUserDetails(); // Récupère les détails de l'utilisateur
        islogged.value = true; // Met à jour le statut de connexion
        // Redirige l'utilisateur après la connexion réussie
      }

      return response;
    } catch (error) {
      console.error('Error during login:', error);
      // Gestion de l'erreur pour l'interface utilisateur
      return error;
    } finally {
      loading.value = false; // Désactive l'indicateur de chargement
    }
  };

  /**
   * Fonction asynchrone pour enregistrer un nouvel utilisateur.
   * @param {Object} payload - Contient l'email et le mot de passe pour l'enregistrement.
   */
  async function register(payload) {
    try {
      // Envoie une requête POST pour enregistrer l'utilisateur.
      const response = await axios.post('http://localhost:3000/users/register', payload);

      // Vérifie si la réponse est réussie et contient les données nécessaires.
      if (response.status === 200 && response.data) {
        // Tente de connecter l'utilisateur directement après l'enregistrement.
        await login(payload);
      } else {
        // Gestion du cas où la réponse ne contient pas les données attendues.
        // Tu peux par exemple renvoyer une erreur ou un message spécifique.
        throw new Error('Réponse inattendue lors de l\'enregistrement');
      }

      return response;
    } catch (error) {
      // Log l'erreur et la renvoie pour une gestion plus poussée.
      console.error('Error during registration:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'enregistrement.');
    }
  }

  /**
   * Fonction asynchrone pour récupérer les détails de l'utilisateur actuellement connecté.
   */
  async function fetchUserDetails() {
    try {
      // Récupère le token du localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        // Si aucun token n'est trouvé, lève une erreur.
        throw new Error('Token non disponible');
      }

      // Envoie une requête GET pour obtenir les détails de l'utilisateur
      const response = await axios.get("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Vérifie si la réponse est conforme aux attentes
      if (response.status === 200 && response.data) {
        me.value = response.data;
        islogged.value = true;     // Met à jour le statut de connexion
      } else {
        // Gestion du cas où la réponse n'est pas ce qui est attendu
        // Par exemple, afficher un message d'erreur ou rediriger l'utilisateur
        throw new Error('Réponse inattendue lors de la récupération des informations utilisateur.');
      }
    } catch (error) {
      // Log l'erreur et la renvoie pour une gestion plus poussée
      console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des informations utilisateur.');
    }
  }





  /**
   * Fonction asynchrone pour déconnecter l'utilisateur.
   * Efface les données de l'utilisateur stockées localement et met à jour l'état de connexion.
   */
  async function signOut() {
    // Efface toutes les données stockées dans localStorage.
    // Remarque : Si tu stockes d'autres données dans localStorage qui ne doivent pas être effacées lors de la déconnexion,
    // tu devrais plutôt supprimer chaque clé spécifiquement plutôt que d'utiliser clear().
    localStorage.clear();

    // Met à jour l'état pour indiquer que l'utilisateur n'est plus connecté.
    islogged.value = false;

    // Ajouter des actions supplémentaires si nécessaire, comme rediriger l'utilisateur
    // vers la page de connexion ou rafraîchir l'état de l'application.
  }




  return {
    login,
    islogged,
    g_islogged,
    signOut,
    fetchUserDetails,
    register,
    getUser,

  }
})
