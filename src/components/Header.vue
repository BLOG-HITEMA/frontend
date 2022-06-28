<script setup>
import { RouterLink } from 'vue-router';
import { useAuthService } from '../services/authService';
import Button from './Button.vue';

const {auth, disconnect} = useAuthService();
</script>
<template>
<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">Accueil</RouterLink>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="auth">
                <RouterLink class="nav-link active" to="/testauth">Test page with Auth Guard</RouterLink>
            </li>
            <li class="nav-item" v-if="!auth">
                <RouterLink class="nav-link" to="/test">Test page without Auth Guard</RouterLink>
            </li>
            <li class="nav-item" v-if="auth">
                <RouterLink class="nav-link" data-test-profil='loick' :to="`/user/${auth.id}`">{{auth.name}}</RouterLink>
            </li>
        </ul>

        <RouterLink v-if="!auth" class="me-2 buttonLien" data-test-connexion='connexion' to="/login">Connexion</RouterLink>
        <RouterLink v-if="!auth" class=" buttonLien" to="/register">Inscription</RouterLink>
        
        <Button v-if="auth" :classSup="'ms-auto'" :text="'Déconnexion'" :click="disconnect"/>
    </div>
</nav>
</template>

<style scoped>
.buttonLien{
    transition: all 0.15s ease-in-out;
    background-color: rgba(var(--blue-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.5);
    border: none;
    height: 48px;
    padding: 11px 24px;
    border-radius: 5px;
    color: rgba(var(--white-color));
    text-decoration: none;
}

</style>
