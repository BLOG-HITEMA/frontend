<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthService } from "../services/authService";
import { useUserService } from "../services/userService";
import { RouterLink } from 'vue-router';
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Select from "../components/Select.vue";
import { useArticleService } from "../services/articleService";
import { useJournalService } from "../services/journalService";

const router = useRouter();
const {auth} = useAuthService();
const {getUserById, updateUser} = useUserService();
const { getArticleByIdUser, askStoreInJournal, acceptArticle } = useArticleService();
const { getJournalByIdUser, getAllJournal } = useJournalService();
const user = ref(null);
const name = ref('');
const errorName = ref('');
const firstname = ref('');
const errorFirstname = ref('');
const {id} = router.currentRoute.value.params;
const list = ref([]);
// Modal publication article dans journal
const modalPublish = ref(false);
const modalListJournal = ref(null);
const idPublish = ref('');
const journalPublish = ref('');
const errorJournalPublish = ref('');
// Modal Accept article dans journal
const modalAccept = ref(false);
const idAccept = ref('');

onMounted(async () => {
    const response = await getUserById(id);
    if (response) {
        if (response.role === "author") {
            const responseArticle = await getArticleByIdUser(response._id);
            list.value = responseArticle ?? [];
            if (responseArticle) {
                const responseModalJournal = await getAllJournal();
                if (responseModalJournal) {
                    modalListJournal.value = responseModalJournal.map((elm) => {
                        return {value: elm._id, text: elm.title};
                    })
                }
            }
        }
        else{
            const responseJournal = await getJournalByIdUser(response._id);
            list.value = responseJournal ?? [];
        }
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
    if (journalPublish.value) {
        const response = await askStoreInJournal(idPublish.value, journalPublish.value);
        if (response) {
            list.value = list.value.map((elm) => {
                if (elm._id === idPublish.value) {
                    elm.published = false;
                    elm.journal = "published_asked";
                }
                return elm;
            });            
        }
    }
    else{
        const response = await acceptArticle('1', idPublish.value);
        if (response) {
            list.value = list.value.map((elm) => {
                if (elm._id === idPublish.value) {
                    elm.published = true;
                }
                return elm;
            });
        }
    }
    modalPublish.value = false;
    journalPublish.value = '';
    idPublish.value = '';
}
async function supprimerArticle(){

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
                <div class="row align-items-center list-card" v-for="art in list" :key="art._id">
                    <div class="col-4">
                        <h3 class="text txtCut mb-0">{{art.title}}</h3>
                    </div>
                    <div class="col-2">
                        <p :class="`text mb-0 ${art.published ? 'text-green' : art.journal ? 'text-orange' : 'text-grey'}`">{{art.published ? "Publié" : art.journal ? "En attente" : "Non publié"}}</p>
                    </div>
                    <div class="col-6 text-end btn-section" v-if="auth && auth._id === user._id">
                        <Button :text="'Publier'" :classSup="'me-lg-2 mb-2 mb-lg-0'" :color="'green'" @click="() => {modalPublish = true; idPublish = art._id}" v-if="!art.published && !art.journal"/>
                        <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Modifier</RouterLink>
                        <Button :text="'Supprimer'"  :classSup="'ms-lg-2 mt-2 mt-lg-0'" :color="'red'" @click="supprimerArticle()"/>
                    </div>
                    <div class="col-6 text-end" v-else>
                        <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Lire</RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mt-3" v-else-if="user && user.role === 'editor'">
            <div class="col-12" v-if="auth && auth._id === user._id">
                <h2 class="subtitle">Mes journaux</h2>
            </div>
            <div class="col-12" v-else>
                <h2 class="subtitle">Ses journaux</h2>
            </div>
            <div class="col-11">
                <div class="row align-items-center list-card" v-for="jour in list" :key="jour._id">
                    <!--<div class="col-4">
                        <h3 class="text txtCut mb-0">{{art.title}}</h3>
                    </div>
                    <div class="col-2">
                        <p :class="`text mb-0 ${art.published ? 'text-green' : art.journal ? 'text-orange' : 'text-grey'}`">{{art.published ? "Publié" : art.journal ? "En attente" : "Non publié"}}</p>
                    </div>
                    <div class="col-6 text-end btn-section" v-if="auth && auth._id === user._id">
                        <Button :text="'Publier'" :classSup="'me-lg-2 mb-2 mb-lg-0'" :color="'green'" @click="() => {modalPublish = true; idPublish = art._id}" v-if="!art.published && !art.journal"/>
                        <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Modifier</RouterLink>
                        <Button :text="'Supprimer'"  :classSup="'ms-lg-2 mt-2 mt-lg-0'" :color="'red'" @click="supprimerArticle()"/>
                    </div>
                    <div class="col-6 text-end" v-else>
                        <RouterLink class="linkAsBtn" :to="`/articles/${art._id}`">Lire</RouterLink>
                    </div>-->
                </div>
            </div>
        </div>

        <div :class="`modal fade ${modalPublish && ('show d-block')}`" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Selection de journal</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="mb-2 text">Veuillez choisir un journal de publication</p>
                        <Select :options="modalListJournal" :classSup="'w-100'" v-model="journalPublish" :error="errorJournalPublish" :label="'Publier directement'"/>
                        <p class="mb-0 subtext text-grey">Si vous choisissez aucun journal, votre article sera automatiquement publié</p>
                    </div>
                    <div class="modal-footer">
                        <Button :text="'Publier'" @click="publish()"/>
                        <Button :text="'Fermer'" :color="'red'" @click="() => {modalPublish = false; idPublish = ''}"/>
                    </div>
                </div>
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
@media only screen and (max-width: 996px) {
    .btn-section > *{
        width: 100%;
        text-align: center;
    }
}
.modal.show{
    background: rgba(var(--grey-color), 0.7);
}
</style>