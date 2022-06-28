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

const auth = ref(null);

function useAuthService(){
    return {auth, connect, disconnect, autoConnect, register};
}
async function connect(email, password){
    const response = await axios.post('http://localhost:3001/api/users/login', {"email": email,"password": password}).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
    successToast("Vous êtes connecté !");
    localStorage.setItem('token-projectm1', response.headers['x-auth-token']);
    router.push({ name: "home" });
}
async function autoConnect(){
    if (localStorage.getItem('token-projectm1')) {
        const response = await axios.post('http://localhost:3001/moncompte').then(res => res).catch(err => err);
        if (response.status !== 200) {
            errorToast("Vous êtes déconnecté");
            localStorage.removeItem('token-projectm1');
            return null;
        }
        successToast("Vous êtes connecté !");
        auth.value = response.data.auth;
    }
}
function disconnect(){
    if (auth) {
        successToast("Vous êtes déconnecté");
        auth.value = null;
        localStorage.removeItem('token-projectm1');
    }
}
async function register(email, password){
    const response = await axios.post('http://localhost:3001/register', {"email": email,"password": password}).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
    successToast("Vous êtes inscrit !");
    router.push({ name: "home" });
}

export {useAuthService};