// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Імпортуємо роутер

const app = createApp(App);

app.use(router);  // Використовуємо роутер
app.mount('#app');  // Монтуємо додаток
