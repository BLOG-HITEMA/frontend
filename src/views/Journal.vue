<script setup>
import { useJournalService } from "@/services/journalService";
import { useToastService } from "../services/toastService";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useAuthService } from "../services/authService";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import TextArea from '../components/TextArea.vue';
import Joi from 'joi';


const router = useRouter();
const { getById } = useJournalService();
const { auth } = useAuthService();
console.log(router.currentRoute.value.params);
const { id } = router.currentRoute.value.params;
const journal = ref(null);

const title = ref('');
const errorTitle = ref('');

console.log(id);

onMounted(async () => {
  const response = await getById(id);
  journal.value = response;
  console.log(response);
});



  
</script>
<template>
  <main>
    
    <div>
    <div class="container-fluid my-3">
       <div class="row justify-content-center">
        <header v-if="journal">
          <h1 class="title">{{journal.title}} </h1>
          <p class="text">créer par {{journal.user.firstname}} {{journal.user.name}}</p>

      <div class="row justify-content-center" v-if="journal.articles && journal.articles.length > 0">
        <div class="col-12">
            <h2 class="subtitle">Découvrez nos incroyables <span>articles</span> !</h2>
        </div>
        <div class="card col-lg-3 col-10 m-2 px-0" v-for="art in journal.articles" :key="art.title">
            <img class="card-img-top" :src="art.image" :alt="art.title">
            <div class="card-body mb-2">
                <h5 class="card-title subtitle text-blue txtCut" :title="art.title">{{art.title}}</h5>
                <p :class="`card-text text ${!art.user && ('text-grey')}`">Par {{`${art.user ? art.user.firstname + " " + art.user.name : "inconu"}`}}</p>
                <div class="d-flex align-items-center justify-content-between">
                    <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Lire</RouterLink>
                </div>
            </div>
        </div>
    </div>
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