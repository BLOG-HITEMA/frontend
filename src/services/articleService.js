import axios from "axios";
import { ref } from "vue";
import { useToastService } from "./toastService";
import { useRouter } from "vue-router";

const {errorToast} = useToastService();
const router = useRouter();


axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token-projectm1')}` || "";
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});

const base_url = import.meta.env.VITE_URL_API;
const articles = ref(null);

function useArticleService(){
    return {articles, getAll, createArticle, updateArticle, deleteArticle, askStoreInJournal, acceptArticle};
}

async function getAll(){
    const response = await axios.get(`${base_url}/articles`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
    articles.value = response.data;
    return response;
}
async function createArticle(title, content, image, published = false){
    const data = {
        "title": title,
        "content": content,
        "published": published,
        "image": image
    }
    const response = await axios.post(`${base_url}/articles/create`, data).then(res => res).catch(err => err);
    if (response.status !== 201) {
        errorToast('Erreur lors de la création de votre article');
        return null;
    }
    return response;
}
async function updateArticle(id, title, content, published, image){
    const data = {
        "title": title,
        "content": content,
        "published": published,
        "image": image
    }
    const response = await axios.patch(`${base_url}/articles/update/${id}`, data).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast('Erreur lors de la mise à jour de votre article');
        return null;
    }
    return response;
}
async function deleteArticle(id){
    const response = await axios.delete(`${base_url}/articles/delete/${id}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast('Erreur lors de la supression de votre article');
        return null;
    }
    return response;
}
async function askStoreInJournal(idArt, idJour){
    const response = await axios.get(`${base_url}/store/${idArt}/in/${idJour}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Erreur lors de la demande d'adhésion au journal");
        return null;
    }
    return response;
}
async function acceptArticle(accept, id){
    const response = await axios.patch(`${base_url}/accept/${accept}/${id}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Erreur lors de l'adhésion au journal");
        return null;
    }
    return response;    
}

export {useArticleService};