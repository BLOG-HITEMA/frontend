<script setup>
import { RouterLink } from 'vue-router';
import { useAuthService } from '../services/authService';
import Button from './Button.vue';

defineProps({
    toggle: {
        type: Function,
        default: () => {}
    },
    isMobile: {
        type: Boolean
    }
});
const {auth} = useAuthService();
</script>
<template>
<nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
        <Button @click="toggle()" :text="'<<'" :classSup="'me-3 py-2 px-3'" :color="'white'"/>
        <RouterLink class="brand title" to="/">Write it !</RouterLink>
        <RouterLink v-if="auth" class="profil-link px-3 py-2" data-test-profil='loick' :to="`/users/${auth.id}`">Profil</RouterLink>
        <RouterLink v-if="!isMobile && !auth" class="ms-auto me-2 linkAsBtn" data-test-connexion='connexion' to="/login">Connexion</RouterLink>
        <RouterLink v-if="!isMobile && !auth" class="linkAsBtn" to="/register">Inscription</RouterLink>
    </div>
</nav>
</template>

<style scoped>
nav{
    padding: 16px 8px;
    box-shadow: 2px 0px 5px 2px rgba(var(--grey-color), 0.5);
}
.brand{
    text-decoration: none;
    color: rgba(var(--blue-color));
    font-weight: 700;   
}
.profil-link{
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    color: rgba(var(--blue-color));
    font-weight: 700;
    border-radius: 5px;
}
.profil-link:hover{
    transition: all 0.3s ease-in-out;
    background-color: rgba(var(--blue-color));
    color: white;
}
</style>
