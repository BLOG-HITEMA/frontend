import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast, { POSITION, TYPE } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
const options = {
    position: POSITION.TOP_RIGHT,
    type: TYPE.DEFAULT,
};

const app = createApp(App)

app.use(router);
app.use(Toast, options)

app.mount('#app')
