import { useToast } from 'vue-toastification';

const toast = useToast();

function useToastService(){
    return {infoToast, successToast, errorToast, warningToast}
}
function infoToast(msg, options = {}){
    toast.info(msg, options);
}
function successToast(msg, options = {}){
    toast.success(msg, options);
}
function errorToast(msg, options = {}){
    toast.error(msg, options);
}
function warningToast(msg, options = {}){
    toast.warning(msg, options);
}

export {useToastService};