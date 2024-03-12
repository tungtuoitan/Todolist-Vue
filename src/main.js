import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Container from './components/Container.vue'

const app = createApp(App);
const pinia = createPinia();

const routes = [
  {
    path: "/list",
    component: Container,
  },
  {
    path: "/list/:type",
    component: Container,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  mode: 'history',
});
app.use(router);
app.use(pinia);
app.mount("#app");
