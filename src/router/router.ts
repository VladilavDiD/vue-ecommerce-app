import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Cart from '@/views/Cart.vue';
import Favorites from '@/views/Favorites.vue';
import NotFound from '@/views/404.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart },
  { path: '/favorites', component: Favorites },
  { path: '/:catchAll(.*)', component: NotFound }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
