<script setup>

    defineProps({
        placeholder: {
            type: String,
            default: 'Default placeholder',
        },
        name: {
            type: String
        },
        id: {
            type: [String, Number]
        },
        label: {
            type: String,
            default: "Default label"
        },
        rows: {
            type: Number,
            default: 15
        },
        cols: {
            type: Number,
            default: 33
        },
        classSup: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String
        },
        error: {
            type: String
        },
    });
    defineEmits(['update:modelValue']);
</script>
<template>
    <label class="text d-block mb-2" :for="id">{{label}}</label>
    <textarea :class="`text mb-3 ${classSup} ${error ? 'mb-1 error' : 'mb-3'}`" :id="id" :name="name" :rows="rows" :cols="cols" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
    <p class="mb-3 text-red" v-if="error">{{error}}</p>  
</template>
<style scoped>
textarea{
    resize: none;
    transition: all 0.15s ease-in-out;
    border-radius: 5px;
    border: 1px solid rgba(var(--grey-color));
    padding: 10px 24px;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
}
textarea:hover{
    transition: all 0.15s ease-in-out;
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.4);
}
</style>