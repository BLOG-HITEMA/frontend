<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';
import { onMounted, ref } from 'vue';
import dotenv from 'dotenv';
import { useAuthService } from './services/authService';
import { useRouter } from "vue-router";

const router = useRouter();

    const activeAside = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? false : true);
    const isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false);
    const toggleActiveAside = () => {
        activeAside.value = !activeAside.value;
    }
    const {autoConnect} = useAuthService();
    onMounted(async () => {
        const response = await autoConnect();
    })
</script>
    
<template>
    <Aside :active="activeAside" :isMobile="isMobile"/>
    <div :class="`container-custom ${isMobile ? (activeAside ? 'collapsed-r' : 'no-collapsed-r') : ''}`">
        <Header :toggle="toggleActiveAside" :isMobile="isMobile"/>
        <RouterView />
    </div>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');
@import '@/assets/style.css';
.container-custom{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    max-height: 100%;
}
.no-collapsed-r {
    transition: all 0.3s ease;
    margin-right: 0;
}
.collapsed-r{
    transition: all 0.3s ease;
    margin-right: -175px;
}
</style>
