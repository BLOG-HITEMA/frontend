<script setup>
import { onMounted, ref } from 'vue';
import { useAuthService } from '../services/authService';
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import TextArea from '../components/TextArea.vue';
import axios from 'axios';
import Joi from 'joi';
import { useArticleService } from '../services/articleService';
import { useRouter } from 'vue-router';
    
    const router = useRouter();
    const exampleImage = ref([]);
    const { auth } = useAuthService();
    const { createArticle } = useArticleService();
    const title = ref('');
    const errorTitle = ref('');
    const content = ref('');
    const errorContent = ref('');
    const image = ref('');
    const errorImage = ref('');

    onMounted(async () => {
        for (let i = 0; i < 9; i++) {
            const response = await axios.get('https://picsum.photos/300/150');
            exampleImage.value.push(response.request.responseURL)
        }
        exampleImage.push
    });

    async function creationArticle(){
        const scheme = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string().required()
        });
            
        const payload = { title: title.value, content: content.value, image: image.value };
        const { error } = scheme.validate(payload, {abortEarly: false});    
        if (error) {
            errorTitle.value = error.details.find(elm => elm.path[0] === "title")?.message ?? "";
            errorContent.value = error.details.find(elm => elm.path[0] === "content")?.message ?? "";
            errorImage.value = error.details.find(elm => elm.path[0] === "image")?.message ?? "";
            return;
        } else {
            errorTitle.value = "";
            errorContent.value = "";
            errorImage.value = "";
            const response = await createArticle(title.value, content.value, image.value);
            response && (router.push({ name: "home" }))
        }
    }
</script>
<template>
    <main class="container-fluid">
        <div class="row justify-content-center">
            <form @submit.prevent="creationArticle()" class="col-12" v-if="auth && auth.role === 'author'">
                <h1 class="title" data-test-h1="h1-login">Création d'un {{auth.role === "author" ? "article" : "journal"}}</h1>
                <div class="form-group">
                    <Input :placeholder="'Titre'" :error="errorTitle" :type="'text'" v-model="title" />
                </div>
                <div class="form-group">
                    <TextArea :placeholder="`Je suis un article fascinant sur...`" :id="'contentArticle'" :error="errorContent" v-model="content" :classSup="'w-100'" :label="'Contenu de votre article'"/>
                </div>
                <ul class="row">
                    <li :class="`col-lg-4 col-6 ${image === img ? 'selected' : ''}`" v-for="img in exampleImage" :key="img">
                        <img class="w-100" :src="img" alt="" @click="(ev) => image = ev.target.src">
                    </li>
                </ul>
                <p class="mb-3 text-red" v-if="errorImage">{{errorImage}}</p>
                <Button :type="'submit'" :color="'green'" :text="`Créer mon ${auth.role === 'author' ? 'article' : 'journal'}`" :classSup="'w-100 mb-3'" />
            </form>
        </div>
    </main>
</template>
<style scoped>
ul{
    list-style-type: none;
}
li{
    margin-bottom: 8px;
    position: relative;
}
img{
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}
img:hover{
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
    scale: 1.05;
}
li.selected::after{
    content: '';
    background-image: url('../assets/icon/check.png');
    background-size: 30px 30px;
    position: absolute;
    width: 30px;
    height: 30px;
    right:25px;
    bottom: 15px;
}
</style>