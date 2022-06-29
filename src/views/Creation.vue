<script setup>
import { useAuthService } from '../services/authService';


    const { auth } = useAuthService();
    console.log(auth)
</script>
<template>
    <main>
        <h1 class="title">Création d'un {{auth.role === "author" ? "article" : "journal"}}</h1>
    </main>
</template>
<style scoped>

</style>