// App.vue
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';
import store from './store/index.js';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import './registerServiceWorker';

axios.defaults.withCredentials = true;

const app = createApp(App);
app.component('QuillEditor', QuillEditor);
app.use(router);
app.use(store);
app.mount('#app');
