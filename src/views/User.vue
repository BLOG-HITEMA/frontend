<script setup>
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

async function update(){
    const scheme = Joi.object({
        name: Joi.string().required(),
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
    }
}
</script>
<template>
    <main class="container-fluid">
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
