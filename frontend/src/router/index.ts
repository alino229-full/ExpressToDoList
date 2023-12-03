import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
    type RouteRecordRaw,
    type RouteLocationNormalized,
    type NavigationGuardNext,
} from "vue-router";
import {authGuard, globalStartupGuard} from "@/router/session";
import { routes } from "@/router/routes";

// Crée et configure le routeur
const createRouterInstance = (routes: Array<RouteRecordRaw>) => {
    const history = import.meta.env.VITE_HASH_ROUTER === "true"
        ? createWebHashHistory(import.meta.env.BASE_URL)
        : createWebHistory(import.meta.env.BASE_URL);

    return createRouter({ history, routes });
};

// Création de l'instance du routeur
const router = createRouterInstance(routes);

// Garde globale du routeur
router.beforeEach(async (to, from, next) => {
    await globalStartupGuard(to);
    await authGuard(to, from, next);
});

export default router;

