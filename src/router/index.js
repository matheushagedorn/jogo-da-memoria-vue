import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import GameView from '@/views/GameView.vue'
import ComoJogarView from '@/views/ComoJogarView.vue'
import CreditosView from '@/views/CreditosView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    
    routes: [
        {
            name: '/',
            path: '/login',
            component: LoginView,
            children: [
                {
                    path: '/',
                    name: '/game',
                    component: GameView
                },
                {
                    path: '/',
                    name: 'como-jogar',
                    component: ComoJogarView
                },
                {
                    path: '/',
                    name: 'creditos',
                    component: CreditosView
                }
            ]
        }
    ]

})

export default router