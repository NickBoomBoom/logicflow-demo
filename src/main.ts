import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// @ts-ignore
import JsonViewer from "vue3-json-viewer";
import "vue3-json-viewer/dist/index.css";
const app = createApp(App);
app.use(JsonViewer);
app.mount("#app");
