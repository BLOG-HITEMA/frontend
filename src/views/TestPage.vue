<script setup>
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import { ref } from 'vue';
import Select from '../components/Select.vue';
import { useToast } from 'vue-toastification';
import TextArea from '../components/TextArea.vue';

// Form variables
const number = ref('');
const radio = ref('');
const check = ref([]);
const select = ref('');
const textarea = ref('');
function displayForm(){
    console.log(number.value);
    console.log(radio.value);
    console.log(select.value);
    console.log(textarea.value);
    console.log(JSON.stringify(check.value))
}

// Notification use case
const toast = useToast();
function displayToast(msg, type = "info"){
    switch (type) {
        case "info":
            toast.info(msg);
            break;
        case "success":
            toast.success(msg);
            break;
        case "error":
            toast.error(msg);
            break;
        case "warning":
            toast.warning(msg);
            break;
        default:
            toast.default(msg);
            break;
    }
}
</script>

<template>
    <main class="container-fluid">
        <div class="row mb-3">
            <p class="subtitle">Taille de textes</p>
            <h1 class="title mb-0">Titre</h1>
            <h2 class="subtitle mb-0">Sous-titre</h2>
            <p class="text mb-0">Texte</p>
            <p class="subtext mb-3">Sous-text</p>
        </div>
        <div class="row justify-content-center">
            <div class="col-12">
                <h3 class="subtitle">Formulaire</h3>
            </div>
            <form class="col-12 col-lg-6 col-md-8" @submit.prevent="displayForm()"> 
                <Input :placeholder="'Hello input'" :type="'text'" />
                <Input :placeholder="'Input Number'" :type="'number'" v-model="number"/>
                <Input disabled/>
                <Input :type="'file'"/>
                <Input :type="'date'"/>
                <Input :error="'Je suis une erreur'" :type="'text'" :placeholder="'Input Error'"/>
                <Input :type="'radio'" :list="[{id:'1', text: 'Premier choix'}, {id:'2', text: 'Second choix'}]" :name="'choix'" v-model="radio"/>
                <Input :type="'checkbox'" :list="[{id:'56', text: 'Choix 56'}, {id:'42', text: 'Choix 42'}]" :name="'checkChoix'" v-model="check"/>
                
                <Select :options="[{value: '1', text: 'Choix 1'},{value: '2', text: 'Choix 2'}]" :selectName="'selectChoix'" v-model="select" :classSup="'w-100'"/>
                <Select :error="'Je suis une erreur'" :options="[{value: '1', text: 'Choix 1'},{value: '2', text: 'Choix 2'}]" :selectName="'selectChoixError'" :classSup="'w-100'"/>
                
                <TextArea :id="'txtArea'" :placeholder="'Renseignez votre article'" :label="'Text Area Test'" :classSup="'w-100'" v-model="textarea"/>
                
                <Button :type="'submit'" :text="'Bouton couleur par défaut'" :classSup="'w-100 mb-3'" />
                <Button :type="'submit'" :color="'green'" :text="'Bouton vert'"/>
                <Button :color="'red'" :text="'Bouton rouge'"/>
                <Button :color="'red'" :text="'Bouton désactivé'" disabled/>
            </form>
            <div class="col-12">
                <h3>Notification</h3>
                <Button :color="'blue'" :text="'Notification info'" :classSup="'m-2'" :click="() => displayToast('Hello Info')"/>
                <Button :color="'green'" :text="'Notification success'" :classSup="'m-2'" :click="() => displayToast('Hello Success', 'success')"/>
                <Button :color="'red'" :text="'Notification error'" :classSup="'m-2'" :click="() => displayToast('Hello Error', 'error')"/>
                <Button :color="'orange'" :text="'Notification warning'" :classSup="'m-2'" :click="() => displayToast('Hello Warning', 'warning')"/>
            </div>
        </div>
    </main>
</template>
<style>
.Vue-Toastification__toast{
    font-family: 'Poppins', sans-serif!important;
}
.Vue-Toastification__toast--info {
    background-color: #5653B5!important;
}
.Vue-Toastification__toast--success {
    background-color: #87D749!important;
}
.Vue-Toastification__toast--error {
    background-color: #D76349!important;
}
.Vue-Toastification__toast--warning {
    background-color: #FFC25D!important;
}
</style>