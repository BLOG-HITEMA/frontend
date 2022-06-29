<script setup>
<<<<<<< HEAD
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

=======
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthService } from "../services/authService";
import { useUserService } from "../services/userService";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Joi from "joi";

const router = useRouter();
const {auth} = useAuthService();
const {getUserById, updateUser} = useUserService();
const user = ref(null);
const name = ref('');
const errorName = ref('');
const firstname = ref('');
const errorFirstname = ref('');
const {id} = router.currentRoute.value.params;

onMounted(async () => {
    const response = await getUserById(id);
    firstname.value = response?.firstname ?? '';
    name.value = response?.name ?? '';
    user.value = response ?? null;
})
>>>>>>> devwezerg

async function update(){
    const scheme = Joi.object({
        name: Joi.string().required(),
<<<<<<< HEAD
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
=======
        firstname: Joi.string().required()
    });
    const payload = { name: name.value, firstname: firstname.value};
    const { error } = scheme.validate(payload, {abortEarly: false});
    if (error) {
        errorName.value = error.details.find(elm => elm.path[0] === "name")?.message ?? "";
        errorFirstname.value = error.details.find(elm => elm.path[0] === "firstname")?.message ?? "";
        return
    }
    else{
        errorName.value = "";
        errorFirstname.value = "";
        const response = await updateUser(id, name, firstname);
        if (response) {
            user.value = response;
            name.value = response.name;
            firstname.value = response.firstname;
        }
>>>>>>> devwezerg
    }
}
</script>
<template>
    <main class="container-fluid">
<<<<<<< HEAD
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
=======
        <div class="row justify-content-center" v-if="user">
            <div class="col-12" v-if="auth && auth._id === user._id">
                <h1 class="title">Mon profil</h1>
                <p class="text text-grey">Sur votre profil, vous pouvez éditez vos informations</p>
            </div>
            <div class="col-12" v-else>
                <h1 class="title">Profil de {{user.firstname + " " + user.name}}</h1>
            </div>
            <form class="col-lg-8 col-12" @submit.prevent="update()" v-if="auth && auth._id === user._id">
                <div class="form-input">
                    <Input :placeholder="'Nom'" v-model="name" :error="errorName"/>
                </div>
                <div class="form-input">
                    <Input :placeholder="'Prénom'" v-model="firstname" :error="errorFirstname"/>
                </div>
                <div class="form-input">
                    <Button :text="'Mettre à jour'" :classSup="'w-100'" :color="'orange'"/>
                </div>
            </form>
        </div>
        <div class="row">
            <!-- Code here for articles & journals -->
        </div>
    </main>
</template>
<style scoped>

</style>
>>>>>>> devwezerg
