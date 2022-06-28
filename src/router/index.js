import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import TestPage from '../views/TestPage.vue';
import { useAuthService } from '../services/authService';

const {auth} = useAuthService();
function isAuth(){ // AuthGuard
    if (auth.value && !auth.value.id) {
        return {path: '/', name: 'home'};   
    }
}
function isAdmin(){
    if (auth.value && !auth.value.role) {
        return {path: '/', name: "home"};
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/testauth',
            name: 'test-page-auth',
            component: TestPage,
            beforeEnter: [isAuth]
        },
        {
            path: '/test',
            name: 'test-page',
            component: TestPage
        }
    ]
})

export default router
