<script setup>
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { useAuthService } from "@/services/authService";
import { useRouter } from "vue-router";
import { useToastService } from "../services/toastService";
/*import { useToast } from 'vue-toastification';*/
import Joi from "joi";
import { ref } from "vue";

const {errorToast, successToast} = useToastService();

const { connect, auth } = useAuthService();
const router = useRouter();

const email = ref("");
const password = ref("");
const erroremail = ref('');
const errorpassword = ref('');

// envoie un toast quand je recois une erreur et quand je me connect
/*const toast = useToast();
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
}*/

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
    
    for (let index = 0; index < error.details.length; index++) {
        if(error.details[index].context.key == 'email'){
            erroremail.value = error.details[index].message
            console.log(erroremail.value, ' Email')
        }
        if(error.details[index].context.key == 'password'){
            errorpassword.value = error.details[index].message
            console.log(errorpassword.value)
        }
        
    }
    
    return;
  } else {
    // Fonction pour ce connecter
    const response = await connect(email.value, password.value);
    if (!response) {   
      errorToast("Cette identifiant n'exite pas");
      return null;
    } else {
      successToast("Vous êtes connecté");
      router.push({ name: "home" });
    }
  }
}

</script>
<template>
  <main class="container-fluid">
    <div class="row justify-content-center">
      <form @submit.prevent="connexion()" class="col-12 col-lg-6 col-md-8">
        <h1 class="title mb-0 my-5" data-test-h1="h1-login">Login</h1>
        <div class="form-group mb-2 my-4">
          <Input :placeholder="'Email'" :error="erroremail" :type="'email'" v-model="email" />
        </div>
        <div class="form-group mb-2 my-4">
          <Input :placeholder="'Mot de passe'" :error="errorpassword" :type="'password'" v-model="password" />
        </div>

        <Button :type="'submit'" :text="'Connexion'" :classSup="'w-100 mb-3'" />
      </form>
    </div>
  </main>
</template>

<style scoped>
</style>
