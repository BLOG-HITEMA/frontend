import axios from "axios";
import { useToastService } from "./toastService";

const {errorToast} = useToastService();

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token-projectm1')}` || "";
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});
const base_url = import.meta.env.VITE_URL_API;

function useUserService(){
    return {getAllUser, getUserById, updateUser, deleteUser};
}
async function getAllUser(){

}
async function getUserById(id){
    const response = await axios.get(`${base_url}/users/${id}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast('Une erreur est survenue');
        return null
    }
    return response.data;
}
async function updateUser(){

}
async function deleteUser(){

}

export {useUserService};