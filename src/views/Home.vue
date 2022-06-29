<script setup>
import { useArticleService } from "@/services/articleService";
import { onMounted, ref } from "vue";
import { RouterLink } from 'vue-router';

const articles = ref(null);
const { getAll } = useArticleService();

onMounted(async () => {
    const response = await getAll();
    articles.value = response;
});

</script>
<template>
  <main class="container-fluid">
    <h1 data-test-h1="h1-accueil">Accueil</h1>

    <div v-if="articles && articles.length > 0" >
      <div class="card text-center my-5" v-for="obj in articles" :key="obj._id">
        <img class="card-img-top" :src="obj.image" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{obj.title}}</h5>
          <p class="card-text">{{obj.content}}</p>
          <RouterLink class="linkAsBtn" :to="`/article/${obj._id}`">Détails</RouterLink>
      </div>
    </div>
</div>

  </main>
</template>