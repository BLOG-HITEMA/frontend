<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthService } from '../services/authService';

const {auth, disconnect} = useAuthService();

    const active = ref(true);
</script>
<template>
    <aside :class="active ? 'no-collapsed' : 'collapsed'">
        <nav>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/testauth">Accueil</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/test">Recherche</RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>
<style scoped>
aside{
    min-width: 175px;
    width: 175px;
    max-width: 175px;
}
.no-collapsed {
    transition: all 0.3s ease;
    margin-left: 0;
}
.collapsed {
    transition: all 0.3s ease;
    margin-left: -175px;
}
</style>