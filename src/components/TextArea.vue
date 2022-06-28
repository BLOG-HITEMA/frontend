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
            default: 5
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
        }
    });
    defineEmits(['update:modelValue']);
</script>
<template>
    <label class="text d-block mb-2" :for="id">{{label}}</label>
    <textarea :class="`text mb-3 ${classSup}`" :id="id" :name="name" :rows="rows" :cols="cols" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
</template>
<style scoped>

</style>