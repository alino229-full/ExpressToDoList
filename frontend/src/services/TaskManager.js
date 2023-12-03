import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from "@/stores/auth";
export function useTaskManager() {
    const auth = useAuthStore();
    const apiUrl = import.meta.env.VITE_API_URL;
    const tasks = ref([]);
    // Extraction du token CSRF du cookie pour des requêtes sécurisées.
    const csrfToken = extractCsrfTokenFromCookie(document.cookie);


    /**
     * Fonction asynchrone pour récupérer les tâches depuis l'API.
     * Elle met à jour la référence `tasks` avec les données récupérées.
     * Gère les erreurs de réseau et de réponse de l'API.
     */
    const fetchTasks = async () => {
        try {
            // Effectue une requête GET pour obtenir les tâches.
            const response = await axios.get(`${apiUrl}/tasks`,{
                params: {
                    authorId: auth.getUser.id
                }
            });

            // Met à jour la liste des tâches avec les données reçues.

            return response.data;
        } catch (error) {
            // En cas d'erreur, log l'erreur dans la console.
            console.error('Error fetching tasks:', error);

            // Gestion optionnelle de l'erreur :
            // Tu peux par exemple mettre à jour une variable d'état pour afficher
            // une notification à l'utilisateur, ou réinitialiser `tasks.value`.
        }
    };


    /**
     * Fonction asynchrone pour ajouter une nouvelle tâche via l'API.
     * @param {Object} task - L'objet tâche à ajouter.
     */
    const addTask = async (task) => {
        try {
            const taskWithAuthor = {
                ...task, // Vos autres champs de tâche ici
                authorId: auth.getUser.id // Ajout de l'ID de l'auteur
            };

            // Envoie une requête POST à l'API pour ajouter une nouvelle tâche.
            // L'objet `task` est passé dans le corps de la requête.
            const response = await axios.post(`${apiUrl}/tasks`, taskWithAuthor,{
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken // Récupéré depuis la réponse du serveur
                },
            });

            // Ajoute la tâche retournée par l'API à la liste des tâches.
            // Cela permet de s'assurer que la liste des tâches contient les données les plus récentes.
            tasks.value.push(response.data);
        } catch (error) {
            // En cas d'erreur lors de l'ajout de la tâche, log l'erreur dans la console.
            console.error('Error adding task:', error);

            // Gestion optionnelle de l'erreur :
            // Tu peux par exemple afficher une notification d'erreur à l'utilisateur
            // ou effectuer d'autres actions de récupération.
        }
    };


    /**
     * Fonction asynchrone pour mettre à jour une tâche existante via l'API.
     * @param {Object} updatedTask - L'objet tâche mis à jour.
     */
    const updateTask = async (updatedTask) => {
        try {

            // Envoie une requête PUT à l'API pour mettre à jour la tâche spécifiée.
            // `updatedTask` est l'objet tâche contenant les mises à jour.
            await axios.put(`${apiUrl}/tasks/${updatedTask.id}`, updatedTask, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken // Récupéré depuis la réponse du serveur
                }
            });

            // Recherche l'index de la tâche dans la liste des tâches.
            const index = tasks.value.findIndex(task => task.id === taskId);

            // Si la tâche est trouvée, met à jour la tâche dans la liste locale.
            // Cela garantit que l'affichage est synchronisé avec les données du serveur.
            if (index !== -1) {
                tasks.value[index] = {...tasks.value[index], ...updatedTask};
            }
        } catch (error) {
            // En cas d'erreur lors de la mise à jour, log l'erreur dans la console.
            console.error('Error updating task:', error);

            // Gestion optionnelle de l'erreur :
            // Affichage d'une notification d'erreur ou d'autres mesures correctives.
        }
    };

    /**
     * Fonction asynchrone pour mettre à jour l'état d'une tâche existante via l'API.
     * @param taskId - L'ID de la tâche à mettre à jour.
     * @param newStatus - Le nouvel état de la tâche.
     */
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            // Préparer l'objet de mise à jour.
            const updateData = {
                status: newStatus
            };

            // Envoie une requête PUT à l'API pour mettre à jour l'état de la tâche spécifiée.
            const response = await axios.put(`${apiUrl}/tasks/status/${taskId}`, updateData);

            // Vérifie si la tâche a été mise à jour avec succès.
            if (response.data && response.data.success) {
                // Recherche l'index de la tâche dans la liste des tâches.
                const index = tasks.value.findIndex(task => task.id === taskId);

                // Si la tâche est trouvée, met à jour son état dans la liste locale.
                if (index !== -1) {
                    tasks.value[index].status = newStatus;
                }
            } else {
                // Gérer le cas où la tâche n'a pas été mise à jour avec succès.
                console.error('Error updating task status: Task not updated.');
            }
        } catch (error) {
            // En cas d'erreur lors de la mise à jour, log l'erreur dans la console.
            console.error('Error updating task status:', error);

            // Gestion optionnelle de l'erreur :
            // Affichage d'une notification d'erreur ou d'autres mesures correctives.
        }
    };



    /**
     * Fonction asynchrone pour supprimer une tâche via l'API.
     * @param {number} taskId - L'identifiant de la tâche à supprimer.
     */
    const deleteTask = async (taskId) => {
        try {
            // Envoie une requête DELETE à l'API pour supprimer la tâche spécifiée.
            await axios.delete(`${apiUrl}/tasks/${taskId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken // Récupéré depuis la réponse du serveur
                }
            });

            // Met à jour la liste des tâches en filtrant celle qui vient d'être supprimée.
            // Cela assure que la liste des tâches reflète l'état actuel du serveur.
            tasks.value = tasks.value.filter(task => task.id !== taskId);
        } catch (error) {
            // En cas d'erreur lors de la suppression, log l'erreur dans la console.
            console.error('Error deleting task:', error);

            // Gestion optionnelle de l'erreur :
            // Affichage d'une notification d'erreur ou d'autres mesures correctives.
        }
    };

    /**
     * Extrait le token CSRF du cookie.
     * @param {string} cookie - Le cookie d'où extraire le token.
     * @returns {string} Le token CSRF.
     */
    function extractCsrfTokenFromCookie(cookie) {
        return cookie.replace(
            /(?:(?:^|.*;\s*)csrfToken\s*=\s*([^;]*).*|$)|^.*$/,
            '$1'
        );
    }


    return { tasks, fetchTasks, addTask, updateTask, deleteTask,updateTaskStatus };
}
