<!-- src/components/Movie.vue -->
<template>
    <div class="movie-item">
      <h2>{{ title }} ({{ releaseYear }})</h2>
      <p>Rating: {{ rating }}</p>
      <p>Duration: {{ durationH }} hours {{ durationM }} minutes</p>
      <ul>
        <li v-for="g in gerne" :key="g">{{ g }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      releaseYear: String,
      rating: String,
      gerne: Array,
      durationH: Number,
      durationM: Number
    }
  };
  </script>
  