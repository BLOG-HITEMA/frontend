<script setup>
    defineProps({
        text: {
            type: String,
            default: "Default text"
        },
        color: {
            type: String,
            default: "blue"
        },
        type: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        click: {
            type: Function
        },
        classSup: {
            type: String,
            default: ""
        }
    });
</script>
<template>
    <button :class="`text ${color + ' ' + classSup}`" :type="type" :disabled="disabled" v-on:click="click">{{text}}</button>
</template>
<style scoped>
button{
    transition: all 0.15s ease-in-out;
    background-color: none;
    border: none;
    height: 48px;
    padding: 8px 24px;
    border-radius: 5px;
    color: rgba(var(--white-color));
}
button.blue{
    background-color: rgba(var(--blue-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--blue-color), 0.5);
}
button.red{
    background-color: rgba(var(--red-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--red-color), 0.5);
}
button.orange{
    background-color: rgba(var(--orange-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--orange-color), 0.5);
}
button.green{
    background-color: rgba(var(--green-color));
    box-shadow: 0px 0px 5px 2px rgba(var(--green-color), 0.5);
}
button:hover{
    transition: all 0.15s ease-in-out;
}
button.blue:hover{
    background-color: rgba(var(--blue-color), 0.7);
}
button.red:hover{
    background-color: rgba(var(--red-color), 0.7);
}
button.orange:hover{
    background-color: rgba(var(--orange-color), 0.7);
}
button.green:hover{
    background-color: rgba(var(--green-color), 0.7);
}
button:disabled{
    color: rgba(var(--background-grey-color));
    background-color: rgba(var(--grey-color))!important;
    box-shadow: 0px 0px 5px 2px rgba(var(--grey-color), 0.5);
}
</style>