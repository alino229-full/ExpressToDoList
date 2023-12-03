export const routes = [
    {
        // Route pour la page "NotFound"
        path: "/:patchMatch(.*)*",
        name: "notfound",
        meta: { system: "notfound.system", auth: false },
        component: () => import("@/views/NotFoundPage.vue"),
    },
    {
        // Route pour le tableau de bord, redirige vers "Tasks"
        path: "/tasks",
        name: "dashboard",
        redirect: { name: "Tasks" },
        meta: { auth: true },
        component: () => import("@/layouts/dash-layout.vue"),
        children: [
            {
                // Sous-route pour la page "Tasks"
                path: "/tasks",
                name: "Tasks",
                component: () => import("@/views/TasksPage.vue"),
                meta: { auth: true },
            },
            // ... autres sous-routes éventuelles
        ],
    },
    {
        // Route pour les pages d'authentification, redirige vers "Login"
        path: "/",
        name: "auth",
        redirect: { name: "Login" },
        meta: { auth: false },
        component: () => import("@/layouts/guess-layout.vue"),
        children: [
            {
                // Sous-route pour la page "Login"
                path: "login",
                name: "Login",
                meta: { auth: false },
                component: () => import("@/views/LoginPage.vue"),
            },
            // ... autres sous-routes d'authentification éventuelles
        ],
    },
    // ... autres routes
];
