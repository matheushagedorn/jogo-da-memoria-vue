import { createRouter, createWebHistory } from "vue-router";

import GameView from "@/views/GameView.vue";
import ComoJogarView from "@/views/ComoJogarView.vue";
import CreditosView from "@/views/CreditosView.vue";
import MenuPrincipalView from "@/views/MenuPrincipalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/menu-principal",
      name: "menu-principal",
      component: MenuPrincipalView,
    },
    {
      path: "/game",
      name: "game",
      component: GameView,
    },
    {
      path: "/como-jogar",
      name: "como-jogar",
      component: ComoJogarView,
    },
    {
      path: "/creditos",
      name: "creditos",
      component: CreditosView,
    },
  ],
});

export default router;
