<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthService } from "../services/authService";
import { useUserService } from "../services/userService";
import { RouterLink } from 'vue-router';
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Joi from "joi";
import { useArticleService } from "../services/articleService";
import { useJournalService } from "../services/journalService";

const router = useRouter();
const {auth} = useAuthService();
const {getUserById, updateUser} = useUserService();
const { getArticleByIdUser } = useArticleService();
const { getJournalByIdUser } = useJournalService();
const user = ref(null);
const name = ref('');
const errorName = ref('');
const firstname = ref('');
const errorFirstname = ref('');
const {id} = router.currentRoute.value.params;
const list = ref([]);

onMounted(async () => {
    const response = await getUserById(id);
    if (response) {
        if (response.role === "author") {
            const responseArticle = await getArticleByIdUser(response._id);
            list.value = responseArticle;
        }
        else{
            const responseJournal = await getJournalByIdUser(response._id);
            list.value = responseJournal;
        }
        console.log(list.value)
    }
    firstname.value = response?.firstname ?? '';
    name.value = response?.name ?? '';
    user.value = response ?? null;
})

async function update(){
    const scheme = Joi.object({
        name: Joi.string().required(),
        firstname: Joi.string().required()
    });
    const payload = { name: name.value, firstname: firstname.value};
    const { error } = scheme.validate(payload, {abortEarly: false});
    if (error) {
        errorName.value = error.details.find(elm => elm.path[0] === "name")?.message ?? "";
        errorFirstname.value = error.details.find(elm => elm.path[0] === "firstname")?.message ?? "";
        return
    }
    else{
        errorName.value = "";
        errorFirstname.value = "";
        const response = await updateUser(id, name.value, firstname.value);
        if (response) {
            user.value = response;
            name.value = response.name;
            firstname.value = response.firstname;
        }
    }
}
async function publish(){

}
async function supprimer(){

}
</script>
<template>
    <main class="container-fluid">
        <div class="row justify-content-center" v-if="user">
            <div class="col-12" v-if="auth && auth._id === user._id">
                <h1 class="title">Mon profil</h1>
                <p class="text text-grey">Sur votre profil, vous pouvez éditez vos informations</p>
            </div>
            <div class="col-12" v-else>
                <h1 class="title">Profil de {{user.firstname + " " + user.name}}</h1>
            </div>
            <div class="col-12">
                <p class="text">Rôle : <span>{{user.role}}</span></p>
            </div>
            <form class="col-lg-8 col-12" @submit.prevent="update()" v-if="auth && auth._id === user._id">
                <div class="form-input">
                    <Input :placeholder="'Nom'" v-model="name" :error="errorName"/>
                </div>
                <div class="form-input">
                    <Input :placeholder="'Prénom'" v-model="firstname" :error="errorFirstname"/>
                </div>
                <div class="form-input">
                    <Button :text="'Mettre à jour'" :classSup="'w-100'" :color="'orange'"/>
                </div>
            </form>
        </div>
        <div class="row justify-content-center mt-3" v-if="user && user.role === 'author'">
            <div class="col-12" v-if="auth && auth._id === user._id">
                <h2 class="subtitle">Mes articles</h2>
            </div>
            <div class="col-12" v-else>
                <h2 class="subtitle">Ses articles</h2>
            </div>
            <div class="col-11">
                <div class="row align-items-center list-card" v-for="art in list" :key="art.id">
                    <div class="col-4">
                        <h3 class="text txtCut mb-0">{{art.title}}</h3>
                    </div>
                    <div class="col-4">
                        <p :class="`text mb-0 ${art.published ? 'text-green' : 'text-grey'}`">{{art.published ? "Publié" : "Non publié"}}</p>
                    </div>
                    <div class="col-4 text-end">
                        <Button :text="'Publier'" :classSup="'me-2'" :color="'green'" @click="publish()" v-if="!art.published"/>
                        <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Modifier</RouterLink>
                        <Button :text="'Supprimer'"  :classSup="'ms-2'" :color="'red'" @click="supprimer()"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3" v-else-if="user && user.role === 'editor'">
            <div class="col-12" v-if="auth && auth._id === user._id">
                <h2 class="subtitle">Mes journaux</h2>
            </div>
            <div class="col-12" v-else>
                <h2 class="subtitle">Ses journaux</h2>
            </div>
        </div>
    </main>
</template>
<style scoped>
.list-card{
    padding: 10px 15px;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
}
.list-card:not(:last-child){
    margin-bottom: 16px;
}
</style>
