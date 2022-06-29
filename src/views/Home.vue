<script setup>
import { useArticleService } from "@/services/articleService";
import { onMounted, ref } from "vue";

const { article, getAll } = useArticleService();

onMounted(async () => {
  await getAll();
});


</script>
<template>
  <main class="container-fluid">
    <h1 data-test-h1="h1-accueil">Accueil</h1>

<div v-if="article && article.length > 0" >
    <div class="card text-center my-5" v-for="obj in article" :key="obj._id">
       <img class="card-img-top" :src="obj.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{obj.title}}</h5>
        <p class="card-text">{{obj.content}}</p>
        <a href="#" class="btn btn-primary">Détails</a>
      </div>

    </div>
</div>

  </main>
</template>