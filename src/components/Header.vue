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
        <Button v-if="auth" :classSup="'ms-auto'" :text="'Déconnexion'" :click="disconnect"/>
    </div>
</nav>
</template>
