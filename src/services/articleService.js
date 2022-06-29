import axios from "axios";
import { ref } from "vue";
import { useToastService } from "./toastService";
import { useRouter } from "vue-router";

const {errorToast, successToast} = useToastService();
const router = useRouter();

/*
axios.interceptors.request.use(function (config) {
    config.headers['x-auth-token'] = localStorage.getItem('token-projectm1') || "";
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});*/

const article = ref(null);

function useArticleService(){
    return {article, getAll};
}

async function getAll(){
    const response = await axios.get('http://localhost:3001/api/articles/all/1').then(res => res).catch(err => err);
    if (response.status !== 200) {
        return null;
    }
    console.log(response.data)
    article.value = response.data;
    return response;
}



export {useArticleService};