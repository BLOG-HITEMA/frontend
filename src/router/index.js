import { createRouter, createWebHistory } from 'vue-router';
import { useAuthService } from '../services/authService';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Creation from '../views/Creation.vue';
import Article from '../views/Article.vue';
import Search from '../views/Search.vue';

const {auth} = useAuthService();
function isAuth(){
    if (!auth.value || !auth.value._id) {
        return {path: '/', name: 'home'};   
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
            path: "/search",
            name: "search",
            component: Search
        }
    ]
})

export default router
