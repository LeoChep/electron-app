import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/drama", component: () => import("../views/DramaEditor.vue") },
    { path: "/", component: () => import("../views/HomeView.vue") },
  ],
});

export default router;
