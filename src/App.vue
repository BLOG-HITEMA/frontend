<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
    <Header/>
    <RouterView />
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');
@import '@/assets/style.css';
</style>
