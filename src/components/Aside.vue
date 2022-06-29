<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthService } from '../services/authService';
import Button from './Button.vue';

    const {auth, disconnect} = useAuthService();
    defineProps({
        active: {
            type: Boolean,
            default: true
        },
        isMobile: {
            type: Boolean
        }
    });
</script>
<template>
    <aside :class="active ? 'no-collapsed' : 'collapsed'">
        <nav>
            <ul class="navbar-nav me-auto text-center">
            <img class="mx-auto mb-3" src="../assets/icon/signature.png" alt="logoBrand">
                <li class="nav-item">
                    <RouterLink to="/" data-test-id="accueilAside">Accueil</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/search" data-test-id="searchAside">Recherche</RouterLink>
                </li>
                <li v-if="auth" class="nav-item">
                    <RouterLink to="/creation" data-test-id="creationAside">Création</RouterLink>
                </li>
            </ul>
        </nav>
        <div class="mt-auto mb-4 text-center">
            <RouterLink v-if="isMobile && !auth" class="d-block linkAsBtn mb-4" data-test-connexion='connexion' to="/login">Connexion</RouterLink>
            <RouterLink v-if="isMobile && !auth" class="linkAsBtn" to="/register">Inscription</RouterLink>
            <Button v-if="auth" :text="'Déconnexion'" :color="'red'" @click="disconnect()" data-test-id="deconnexion"/>
        </div>
    </aside>
</template>
<style scoped>
aside{
    padding-top: 20px;
    min-width: 175px;
    width: 175px;
    max-width: 175px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(var(--grey-light-color));
}
nav{
    width: 100%;
}
.no-collapsed {
    transition: all 0.3s ease;
    margin-left: 0;
}
.collapsed {
    transition: all 0.3s ease;
    margin-left: -175px;
}
a{
    transition: all 0.3s ease;
    padding: 11px 24px!important;
    color: rgba(var(--background-grey-color));
    display: block;
    text-decoration: none;
}
a:hover{
    color: white;
    background-color: rgba(var(--blue-color));
}
img{
    width: 35px;
}
</style>