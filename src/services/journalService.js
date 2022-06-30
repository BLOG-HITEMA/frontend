import axios from "axios";
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

function useJournalService(){
    return {getAllJournal,getById, createJournal,updateJournal, deleteJournal, searchJournal, getJournalByIdUser };
}

async function getAllJournal(){
    const response = await axios.get(`${base_url}/journals/`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
    return response.data;
}

async function getById(id){
    const response = await axios.get(`${base_url}/journals/${id}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Une erreur est survenue");
        return null;
    }
   
    return response.data;
}

async function createJournal(title){
    const data = {
        "title": title
    }
    const response = await axios.post(`${base_url}/journals/`, data).then(res => res).catch(err => err);
    if (response.status !== 201) {
        errorToast('Erreur lors de la création de votre journal');
        return null;
    }
    successToast('Félicitation pour la création de votre journal')
    return response.data;
}

async function updateJournal(id, title){
    const data = {
        "title": title
    }
    const response = await axios.patch(`${base_url}/journals/${id}`, data).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast('Erreur lors de la mise à jour de votre journal');
        return null;
    }
    return response.data;
}

async function deleteJournal(id){
    const response = await axios.delete(`${base_url}/journals/${id}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast('Erreur lors de la supression de votre journal');
        return null;
    }
    return response;
}
async function searchJournal(search, page = 1){
    const response = await axios.get(`${base_url}/journals/search/${page}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast('Erreur lors de la récupération des journaux');
        return null;
    }
    return response.data;
}
async function getJournalByIdUser(id){
    const response = await axios.get(`${base_url}/journals/editor/${id}`).then(res => res).catch(err => err);
    if (response.status !== 200) {
        errorToast("Erreur lors de la récupération des journaux");
        return null;
    }
    return response.data;
}

export {useJournalService};