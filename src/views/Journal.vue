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
const { getById, updateJournal } = useJournalService();
const { auth } = useAuthService();
const { id } = router.currentRoute.value.params;
const journal = ref(null);

const title = ref('');
const errorTitle = ref('');


onMounted(async () => {
  const response = await getById(id);
  journal.value = response;
  title.value = response?.title ?? '';
});

// fonction update pour la mise a jours des journal
async function update(){
    const scheme = Joi.object({
        title: Joi.string().required()
    });
    const payload = { title: title.value};
    const { error } = scheme.validate(payload, {abortEarly: false});
    if (error) {
        errorTitle.value = error.details.find(elm => elm.path[0] === "title")?.message ?? "";
        return
    }
    else{
        errorTitle.value = "";
        const response = await updateJournal(id, title.value);
        if (response) {
            title.value = response.title;
        }
        response && (router.push({ name: "home" }))
    }
}



  
</script>
<template>
  <main>
    
    <div v-if="journal">
    <div class="container-fluid my-3">
       <div class="row justify-content-center">
        <form class="col-lg-8 col-12" @submit.prevent="update()" v-if="auth && auth._id === journal.user._id">
                <div class="form-input">
                     <Input :error="errorTitle" :type="'text'" v-model="title" :label="'Titre de votre article'"/>
                </div>
                <div class="form-input">
                    <Button :text="'Mettre à jour'" :classSup="'w-100'" :color="'orange'"/>
                </div>
            </form>
        <header v-else>
          <h1 class="title">{{journal.title}} </h1>
          <p class="text">créer par {{journal.user.firstname}} {{journal.user.name}}</p>

      <div class="row justify-content-center" v-if="journal.articles && journal.articles.length > 0">
        <div class="col-12">
            <h2 class="subtitle">Découvrez les <span>articles</span> assosier a notre journal !</h2>
        </div> 
        <div class="card col-lg-3 col-10 m-2 px-0" v-for="art in journal.articles" :key="art.title">
            <img class="card-img-top" :src="art.image" :alt="art.title">
            <div class="card-body mb-2">
                <h5 class="card-title subtitle text-blue txtCut" :title="art.title">{{art.title}}</h5>
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