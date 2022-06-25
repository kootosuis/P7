import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/styles.scss";
import store from './store'

// import GroupomaniaButton from './components/GroupomaniaButton.vue';
// import PostAShare from './components/PostAShare.vue';

// const app = createApp(App).use(store).use(router).mount("#app");

// app.component("PostAShare", PostAShare)

createApp(App).use(store).use(router).mount("#app");



