<script setup>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { useAuthService } from "@/services/authService";
import { useRouter } from "vue-router";
import { useToastService } from "../services/toastService";
/*import { useToast } from 'vue-toastification';*/
import Joi from "joi";
import { ref } from "vue";

const { connect } = useAuthService();

const email = ref("");
const password = ref("");
const errorEmail = ref('');
const errorPassword = ref('');

// Fonction de connexion
async function connexion() {
    //Shema a réspérter
    const scheme = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    const payload = { email: email.value, password: password.value };
    const { value, error } = scheme.validate(payload, {abortEarly: false});
    // Identifier une erreur dans les champs eamil et password 
    if (error) {
        errorEmail.value = error.details.find(elm => elm.path[0] === "email")?.message ?? "";
        errorPassword.value = error.details.find(elm => elm.path[0] === "password")?.message ?? "";
        return;
    } else {
        // Fonction pour ce connecter
        errorEmail.value = "";
        errorPassword.value = "";
        const response = await connect(email.value, password.value);
    }
}

</script>
<template>
  <main class="container-fluid">
    <div class="row justify-content-center">
      <form @submit.prevent="connexion()" class="col-12 col-lg-6 col-md-8">
        <h1 class="title mb-0 my-5" data-test-h1="h1-login">Login</h1>
        <div class="form-group mb-2 my-4">
          <Input :placeholder="'Email'" :error="errorEmail" :type="'email'" v-model="email" />
        </div>
        <div class="form-group mb-2 my-4">
          <Input :placeholder="'Mot de passe'" :error="errorPassword" :type="'password'" v-model="password" />
        </div>
        <Button :type="'submit'" :text="'Connexion'" :classSup="'w-100 mb-3'" />
      </form>
    </div>
  </main>
</template>

<style scoped>
</style>
