import axios from "axios";
import { ref } from "vue";

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
    return {auth, connect, disconnect, autoConnect};
}
async function connect(email, password){
    if (email && password) {
        const response = await axios.post('http://localhost:3001/login', {"email": email,"password": password}).then(res => res).catch(err => err);
        if (response.status !== 200) {
            return null;
        }
        localStorage.setItem('token-projectm1', response.headers['x-auth-token']);
        return auth.value = response.data.auth;
    }
    else{
        return null;
    }
}
async function autoConnect(){
    if (localStorage.getItem('token-projectm1')) {
        const response = await axios.post('http://localhost:3001/moncompte').then(res => res).catch(err => err);
        if (response.status !== 200) {
            localStorage.removeItem('token-projectm1');
            return null;
        }
        auth.value = response.data.auth;
    }
}
function disconnect(){
    if (auth) {
        console.log("Déconnexion");
        auth.value = null;
        localStorage.removeItem('token-projectm1');
    }
}

export {useAuthService};