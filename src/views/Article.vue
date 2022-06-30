<script setup>
import { useArticleService } from "@/services/articleService";
import { useUserService } from "../services/userService";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useAuthService } from "../services/authService";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import TextArea from '../components/TextArea.vue';
import Joi from 'joi';


const router = useRouter();
const { getById, updateArticle } = useArticleService();
const { auth } = useAuthService();
const { id } = router.currentRoute.value.params;
const article = ref(null);

const title = ref('');
const errorTitle = ref('');
const content = ref('');
const errorContent = ref('');

onMounted(async () => {
  const response = await getById(id);
  article.value = response;
  title.value = response?.title ?? '';
  content.value = response?.content ?? '';
  console.log(response)

});

// fonction update pour la mise a jours des artcile
async function update(){
    const scheme = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    });
    const payload = { title: title.value, content: content.value};
    const { error } = scheme.validate(payload, {abortEarly: false});
    if (error) {
        errorTitle.value = error.details.find(elm => elm.path[0] === "title")?.message ?? "";
        errorContent.value = error.details.find(elm => elm.path[0] === "content")?.message ?? "";
        return
    }
    else{
        errorTitle.value = "";
        errorContent.value = "";
        const response = await updateArticle(id, title.value, content.value);
        if (response) {
            title.value = response.title;
            content.value = response.content;
        }
        response && (router.push({ name: "home" }))
    }
}

  
</script>
<template>
  <main>
    
    <div v-if="article">
    <section
      id="banner"
      :style="`background-image:url(${article.image}); background-size:cover;`"
    >
    </section>
    <div class="container-fluid my-5">
       <div class="row justify-content-center">
        <form class="col-lg-8 col-12" @submit.prevent="update()" v-if="auth && auth._id === article.user._id">
                <div class="form-input">
                     <Input :error="errorTitle" :type="'text'" v-model="title" :label="'Titre de votre article'"/>
                </div>
                <div class="form-input">
                     <TextArea :id="'contentArticle'" :error="errorContent" v-model="content" :classSup="'w-100'" :label="'Contenu de votre article'"/>
                </div>
                <div class="form-input">
                    <Button :text="'Mettre à jour'" :classSup="'w-100'" :color="'orange'"/>
                </div>
            </form>
        <header v-else>
          <h1 class="title"> {{article.title}}</h1>

          <p class="text"> {{article.content}}</p>
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