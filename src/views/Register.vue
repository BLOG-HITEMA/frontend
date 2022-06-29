<script setup>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import Joi from "joi";
import { useAuthService } from "@/services/authService";
import { useRouter } from "vue-router";

const { register, auth } = useAuthService();

const router = useRouter();

const email = ref('');
const errorEmail = ref('');
const password = ref('');
const errorPassword = ref('');
const confirmPassword = ref('');
const errorConfirmPassword = ref('');
const name = ref('');
const errorName = ref('');
const firstname = ref('');
const errorFirstname = ref('');
const role = ref('');
const errorRole = ref('');

async function inscription(){
    const scheme = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.any().equal(password.value).required().messages({'any.only': 'Les mots de passes ne correspondent pas.'}),
        name: Joi.string().required(),
        firstname: Joi.string().required(),
        role: Joi.string().required()
    });
    // Vérification des données, et envoi du formulaire
    const payload = { 
        email: email.value, password: password.value, confirmPassword: confirmPassword.value,
        name: name.value, firstname: firstname.value, role: role.value
    };
    const { value, error } = scheme.validate(payload, {abortEarly: false});
    if (error || password.value !== confirmPassword.value) {
        errorEmail.value = error.details.find(elm => elm.path[0] === "email")?.message ?? "";
        errorPassword.value = error.details.find(elm => elm.path[0] === "password")?.message ?? "";
        errorConfirmPassword.value = error.details.find(elm => elm.path[0] === "confirmPassword")?.message ?? "";
        errorName.value = error.details.find(elm => elm.path[0] === "name")?.message ?? "";
        errorFirstname.value = error.details.find(elm => elm.path[0] === "firstname")?.message ?? "";
        errorRole.value = error.details.find(elm => elm.path[0] === "role")?.message ?? "";
        return;
    } 
    else {
        errorEmail.value = "";
        errorPassword.value = "";
        errorConfirmPassword.value = "";
        errorName.value = "";
        errorFirstname.value = "";
        errorRole.value = "";
        const response = await register(email.value, password.value, name.value, firstname.value, role.value);
        response && (router.push({ name: "home" }));
    }
}
</script>
<template>
    <main class="container-fluid">
        <div class="row justify-content-center">
        <form @submit.prevent="inscription()" class="col-12 col-lg-6 col-md-8">
            <h1 class="title mb-0 my-5" data-test-h1="h1-login">Inscription</h1>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Nom'" :error="errorName" :type="'text'" v-model="name" />
            </div>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Prénom'" :error="errorFirstname" :type="'text'" v-model="firstname" />
            </div>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Email'" :error="errorEmail" :type="'email'" v-model="email" />
            </div>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Mot de passe'" :error="errorPassword" :type="'password'" v-model="password" />
            </div>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Confirmation du mot de passe'" :error="errorConfirmPassword" :type="'password'" v-model="confirmPassword" />
            </div>
            <div class="form-group mb-2 my-4">
                <Input :placeholder="'Rôle'" :error="errorRole" :type="'radio'" :list="[{id: 'author', text: 'Auteur'},{id: 'editor', text: 'Editeur'}]" v-model="role" />
                <p class="infoText subtext">Les auteurs peuvent écrire de nouveaux articles tandis que les éditeurs ouvriront des journaux pour référencer les articles</p>
            </div>
            <Button :type="'submit'" :text="'Inscription'" :classSup="'w-100 mb-3'" />
        </form>
        </div>
    </main>
</template>

<style scoped>
.infoText{
    color: rgba(var(--grey-color));
}
</style>
