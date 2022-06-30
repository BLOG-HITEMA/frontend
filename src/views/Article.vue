<script setup>
import { useArticleService } from "@/services/articleService";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();
const { getById } = useArticleService();

const { id } = router.currentRoute.value.params;

const article = ref(null);

onMounted(async () => {
  const response = await getById(id);
  article.value = response;
});

console.log(article.value)

</script>
<template>
  <main>
    
    <div v-if="article">
    <section
      id="banner"
      :style="`background-image:url(${article.image}); background-size:cover;`"
    >
    </section>
    <div class="container-fluid">
       <div class="row justify-content-center">
        <header>
          <h1> {{article.title}}</h1>

          <p> {{article.content}}</p>
        </header>
      </div>
    </div>
  </div>
  </main>
</template>
<style scoped>
#banner{
    	padding: 12em 0 0 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		text-align: center;
		position: relative;
}

</style>