<script setup>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import Joi from "joi";
import { useAuthService } from "@/services/authService";
import { useRouter } from "vue-router";

const { register, auth } = useAuthService();

const router = useRouter();


const name = ref(auth.value.name);
const errorName = ref('');
const firstname = ref(auth.value.firstnames);
const errorFirstname = ref('');

console.log(auth.value)


async function update(){
    const scheme = Joi.object({
        name: Joi.string().required(),
        firstname: Joi.string().required(),
    });

    const payload = { 
        name: name.value, firstname: firstname.value
    };
    const { value, error } = scheme.validate(payload, {abortEarly: false});
    if (error ) {

        errorName.value = error.details.find(elm => elm.path[0] === "name")?.message ?? "";
        errorFirstname.value = error.details.find(elm => elm.path[0] === "firstname")?.message ?? "";
       
        return;
    } 
    else {
        errorName.value = "";
        errorFirstname.value = "";
        errorRole.value = "";
        const response = await updateUser(name.value, firstname.value);
        response && (router.push({ name: "home" }));
    }
}
</script>
<template>
    <main class="container-fluid">
        <div class="row justify-content-center">
        <form @submit.prevent="update()" class="col-12 col-lg-6 col-md-8">
            <h1 class="title mb-0 my-5" data-test-h1="h1-login">Profil</h1>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Nom'" :error="errorName" :type="'text'" v-model="name" />
            </div>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Prénom'" :error="errorFirstname" :type="'text'" v-model="firstname" />
            </div>
           
            <Button :type="'submit'" :text="'Mise à jour'" :color="'orange'" :classSup="'w-100 mb-3'" />
        </form>
        </div>
    </main>
</template>

<style scoped>
.infoText{
    color: rgba(var(--grey-color));
}
</style>
