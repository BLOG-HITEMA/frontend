import axios from "axios";
import { ref } from "vue";
import { useToastService } from "./toastService";
import { useRouter } from "vue-router";

const {errorToast, successToast} = useToastService();
const router = useRouter();


axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token-projectm1')}` || "";
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});

const articles = ref(null);

function useArticleService(){
    return {articles, getAll};
}

async function getAll(){ // A FINIR --------------------
    const response = await axios.get('http://localhost:3001/api/articles/all/1').then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
    articles.value = response.data;
    return response;
}

export {useArticleService};