<!-- src/App.vue -->
<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink> |
      <RouterLink to="/movie-list">Movie List</RouterLink>
      <RouterLink to="/new-movie">New Movie</RouterLink>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@import './assets/styles.css'; /* Import global CSS */
</style>
