<script setup>
import { ref } from 'vue';

    const props = defineProps({
        placeholder: {
            type: String,
            default: "Default placeholder"
        },
        type: {
            type: String,
            default: "text"
        },
        required: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array
        },
        name: {
            type: String
        },
        error: {
            type: String
        },
        modelValue: {
            type: [String, Number, Array]
        }
    });
    defineEmits(['update:modelValue']);
    function updateCheckbox(ev){
        let arr = props.modelValue;
        if (ev.target.checked) {
            arr.push(ev.target.value);   
        }
        else{
            arr = arr.filter(e => e !== ev.target.value);
        }
        return arr;
    }
</script>
<template>
    <div v-if="type !== 'radio' && type !== 'checkbox'">
        <input :class="`text w-100 ${error ? 'mb-1 error' : 'mb-3'}`" :type="type" :placeholder="placeholder" :required="required" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
        <p class="mb-3 text-red" v-if="error">{{error}}</p>
    </div>
    <div v-else-if="type === 'radio'">
        <label class="text mb-3" :for="rad.id" v-for="rad in list" :key="rad.id" @click="$emit('update:modelValue', $event.target.value)">
            <input type="radio" :id="rad.id" :name="name" :value="rad.id">
            {{rad.text}}
        </label>
        <p class="mb-3 text-red" v-if="error">{{error}}</p>
    </div>
    <div v-else-if="type === 'checkbox'">
        <label class="text mb-3" :for="check.id" v-for="check in list" :key="check.id" @click="$emit('update:modelValue', updateCheckbox($event))">
            <input type="checkbox" :id="check.id" :name="name" :value="check.id">
            {{check.text}}
        </label>
        <p class="mb-3 text-red" v-if="error">{{error}}</p>        
    </div>
</template>
<style scoped>
input:not([type="radio"]){
    transition: all 0.15s ease-in-out;
    border-radius: 5px;
    border: 1px solid rgba(var(--grey-color));
    height: 48px;
    padding: 10px 24px;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
}
input:hover{
    transition: all 0.15s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.4);
}
input:focus{
    outline: 3px solid rgba(var(--blue-color), 0.6);
}
input::file-selector-button{
    display: none;
}
input.error{
    border: 1px solid rgba(var(--red-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--red-color), 0.5);
}
input.error:focus{
    outline: 3px solid rgba(var(--red-color), 0.6);
}
input[type="radio"]{
    width: 20px;
    height: 20px;
    margin-right: 8px;
}
label{
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
}
</style>