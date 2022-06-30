<script setup>
import { ref } from 'vue';

    defineProps({
        options:{
            type: Array
        },
        selectName: {
            type: String
        },
        classSup: {
            type: String
        },
        required: {
            type: Boolean,
            default: false
        },
        error: {
            type: String
        },
        modelValue: {
            type: [String, Number]
        },
        label: {
            type: String,
            default: 'Sélectionner une option'
        }
    });
    defineEmits(['update:modelValue']);
</script>

<template>
    <div>
        <select :class="`${error ? 'mb-1 error' : 'mb-3'} ${classSup}`" :name="selectName"  :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :required="required">
            <option class="text" value="">{{label}}</option>
            <option class="text" v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.text}}</option>
        </select>
        <p class="mb-3 text-red" v-if="error">{{error}}</p>
    </div>
</template>
<style scoped>
select{
    transition: all 0.15s ease-in-out;
    border-radius: 5px;
    height: 48px;
    padding: 10px 16px;
    background-color: unset;
    border: 1px solid rgba(var(--grey-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
    font-family: 'Poppins', sans-serif;
}
select:hover{
    transition: all 0.15s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.4);
}
select.error{
    border: 1px solid rgba(var(--red-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--red-color), 0.5);
}
select.error:hover{
    outline: 3px solid rgba(var(--red-color), 0.6);
}
option{
    transition: all 0.15s ease-in-out;
    background-color: rgba(var(--white-color));
}
</style>