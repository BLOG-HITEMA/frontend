<script setup>
import { useArticleService } from "@/services/articleService";
import { onMounted, ref } from "vue";
import { RouterLink } from 'vue-router';

const articles = ref(null);
const { getAll } = useArticleService();

onMounted(async () => {
    const responseArticle = await getAll();
    if (responseArticle) {
        articles.value = responseArticle.slice(0, 5);
    }
});

</script>
<template>
  <main class="container-fluid">
    <div class="row">
        <div class="col-12">
            <h1 data-test-h1="h1-accueil" class="title">Bienvenue sur <span>Write It !</span></h1>
            <p class="text">Partagez avec la communauté vos plus belles histoires, astuces ou documentation.</p>
        </div>
    </div>
    <div class="row justify-content-center" v-if="articles && articles.length > 0">
        <div class="col-12">
            <h2 class="subtitle">Découvrez nos incroyables articles !</h2>
        </div>
        <div class="card col-lg-3 col-10 m-2 px-0" v-for="art in articles" :key="art.title">
            <img class="card-img-top" :src="art.image" :alt="art.title">
            <div class="card-body mb-2">
                <h5 class="card-title subtitle text-blue txtCut" :title="art.title">{{art.title}}</h5>
                <p :class="`card-text text ${!art.user && ('text-grey')}`">Par {{`${art.user ? art.user.firstname + " " + art.user.name : "inconu"}`}}</p>
                <div class="d-flex align-items-center justify-content-between">
                    <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Lire</RouterLink>
                    <p v-if="art.journal" class="text mb-0 text-end">{{art.journal.title}}</p>
                    <p v-else class="text text-grey text-end mb-0">Aucun journal</p>
                </div>
            </div>
        </div>
    </div>
    </main>
</template>
<style scoped>
span{
    font-weight: 700;
    color: rgba(var(--blue-color));
    white-space: nowrap;
}
</style>