import axios from "axios";
import { ref } from "vue";
import { useToastService } from "./toastService";

const {errorToast, successToast} = useToastService();

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token-projectm1')}` || "";
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});
const base_url = import.meta.env.VITE_URL_API;
const auth = ref(null);

function useAuthService(){
    return {auth, connect, disconnect, autoConnect, register};
}

async function connect(email, password){
    const response = await axios.post(`${base_url}/users/login`, {"email": email,"password": password}).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
    successToast("Vous êtes connecté !");
    localStorage.setItem('token-projectm1', response.headers['Authorization'].split(' ')[1]);
    auth.value = response.data.auth;
    return response;
}
async function autoConnect(){
    if (localStorage.getItem('token-projectm1')) {
        const response = await axios.post(`${base_url}/users/reconnect`).then(res => res).catch(err => err);
        if (response.status !== 200) {
            errorToast("Vous êtes déconnecté");
            localStorage.removeItem('token-projectm1');
            return null;
        }
        successToast("Vous êtes connecté !");
        auth.value = response.data.auth;
        return response;
    }
}
function disconnect(){
    if (auth) {
        successToast("Vous êtes déconnecté");
        auth.value = null;
        localStorage.removeItem('token-projectm1');
    }
}
async function register(email, password, name, firstname, role){
    const response = await axios.post(`${base_url}/users/signup`, {"email": email,"password": password, "name": name, "firstname": firstname, "role": role}).then(res => res).catch(err => err);
    if (response.status !== 201) {
        errorToast("Une erreur est survenue");
        return null;
    }
    successToast("Vous êtes inscrit !");
    return response;
}

export {useAuthService};