import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TestPage from '../views/TestPage.vue';
import { useAuthService } from '../services/authService';
import Creation from '../views/Creation.vue';
import Article from '../views/Article.vue';

const {auth} = useAuthService();
function isAuth(){
    if (!auth.value || !auth.value.id) {
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
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
          path: '/register',
          name: 'register',
          component: Register
        },
        {
            path: "/creation",
            name: "creation",
            component: Creation,
            beforeEnter: [isAuth]
        },
        {
            path: "/article/:id",
            name: "article",
            component: Article
        },
        {
            path: "/users/:id",
            name: "users",
            component: User
        }

    ]
})

export default router
