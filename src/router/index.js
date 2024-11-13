// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import MovieListView from "../views/MovieListView.vue";
import NewMovieViewVue from "../views/NewMovieView.vue";
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/movie-list', name: 'MovieList', component: MovieListView },
  { path: '/new-movie', name: 'NewMovie', component: NewMovieViewVue }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
