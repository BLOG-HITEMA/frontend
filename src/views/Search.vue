<script setup>
import { onMounted, ref } from 'vue';
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import Button from '../components/Button.vue';
import Joi from 'joi';
import { useJournalService } from '../services/journalService';
import { useArticleService } from '../services/articleService';
import { RouterLink } from 'vue-router';

const { searchJournal } = useJournalService();
const { searchArticle } = useArticleService();

const search = ref('');
const type = ref('article');
const errorType = ref('');
const page = ref(1);
const maxPages = ref(1);
const list = ref({type: 'article', elm: []});

onMounted(async () => {
    const response = await searchArticle(search.value, 1);
    if (response) {
        page.value = response.page;
        maxPages.value = response.max_pages;
        list.value = response.articles ?? []
    }
});

async function rechercher(){
    const scheme = Joi.object({
        search: Joi.string().allow('').default(''),
        type: Joi.string().required()
    });
    const payload = { search: search.value, type: type.value};
    const { error } = scheme.validate(payload, {abortEarly: false});
    if (error) {
        errorType.value = error.details.find(elm => elm.path[0] === "type")?.message ?? "";
        return;
    } 
    else {
        errorType.value = "";
        let response = null;
        if (type.value === "article") {
            response = await searchArticle(search.value, 1);
            response && (list.value = {type: 'article', elm: response.articles} ?? {type: 'article', elm: []});
        }
        else if(type.value === "journal"){
            response = await searchJournal(search.value, 1);
            response && (list.value = {type: 'journal', elm: response.journals} ?? {type: 'journal', elm: []});
        }
        if (response) {
            page.value = response.page;
            maxPages.value = response.max_pages;
        }
    }
}
</script>
<template>
    <main class="container-fluid">
        <div class="row justify-content-center">
            <form class="col-10" action="" @submit.prevent="rechercher()">
                <h1 class="title mb-3">Rechercher un article ou un journal</h1>
                <div class="row">
                    <div class="col-4">
                        <Input :placeholder="'Rechercher'" v-model="search"/>
                    </div>
                    <div class="col-4">
                        <Select :classSup="'w-100'" v-model="type" :error="errorType" :options="[{value: 'article', text: 'Articles'},{value: 'journal', text: 'Journaux'}]"/>
                    </div>
                    <div class="col-4">
                        <Button :text="'Rechercher'"/>
                    </div>
                </div>
            </form>
        </div>
        <div class="row justify-content-center" v-if="list['type'] === 'article'">
            <div class="card col-lg-3 col-10 m-2 px-0" v-for="art in list.elm" :key="art.title">
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
        <div class="row justify-content-center" v-else-if="list['type'] === 'journal'">
            <div class="card col-lg-3 col-10 m-2" v-for="jour in list.elm" :key="jour.title">
                <div class="card-body mb-2">
                    <h5 class="card-title subtitle text-blue txtCut" :title="jour.title">{{jour.title}}</h5><p :class="`card-text text ${!jour.user && ('text-grey')}`">Par {{`${jour.user ? jour.user.firstname + " " + jour.user.name : "inconu"}`}}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink class="linkAsBtn" :to="`/journal/${jour._id}`">Consulter</RouterLink>
                        <p v-if="jour.articles && jour.articles.length > 0" class="text mb-0 text-end">{{jour.articles.length}} articles</p>
                        <p v-else class="text text-grey text-end mb-0">Aucun article</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>

</style>