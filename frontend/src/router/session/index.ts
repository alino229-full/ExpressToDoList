import { useAuthStore } from "@/stores/auth";
export async function authGuard(to : any, from : any, next : any) {
    const auth = useAuthStore();
    const isLogged = auth.g_islogged;

    // Redirige les utilisateurs déjà connectés loin de la page de connexion
    if (to.name === "Login" && isLogged) {
        return next({ name: "Tasks" });
    }

    // Gère l'accès aux pages qui ne nécessitent pas d'être authentifié
    if (to.meta.auth === false) {
        return isLogged ? next({ name: "Tasks" }) : next();
    }

    // Pour toutes les autres routes, vérifie si l'utilisateur est connecté
    return isLogged ? next() : next({ name: "Login" });
}



/**
 * Garde de routeur global qui s'exécute exactement *une fois*, lorsque l'application est chargée pour la première fois.
 * C'est-à-dire lors du traitement de la toute première route. Tout ce qui doit
 * s'exécuter le plus tôt possible, avant de charger les composants Vue
 * devrait se produire ici.
 *
 * Actuellement, cela :
 * - Charge la session
 * - Gère la vérification de l'authentification pour les routes sécurisées
 */

export async function globalStartupGuard(to : any) {
    void to; // Cette ligne évite un avertissement pour un paramètre non utilisé.
    const token = localStorage.getItem("token");
    const auth = useAuthStore();

    if (token) {
        await auth.fetchUserDetails();

        if (!auth.g_islogged) {
            localStorage.clear(); // Efface le localStorage si l'authentification échoue.
            auth.$reset(); // Réinitialise l'état du store d'authentification.
        }
    }

    return true; // Retourne toujours vrai pour continuer la navigation.
}

