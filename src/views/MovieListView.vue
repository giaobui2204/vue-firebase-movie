<template>
  <div class="container">
    <h1>Movie List</h1>

    <div class ="movie-list content">
      <Movie 
        v-for="movie in movieList" 
        :key="movie.title"
        :title="movie.title"
        :releaseYear="movie.releaseYear"
        :rating="movie.rating"
        :genre="movie.gerne"
        :durationH="movie.durationHour"
        :durationM="movie.durationMinute"  />
    </div>

    <!-- Filter Buttons -->
    <div class="filter-controls">
      <button @click="queryByDuration('<', 2)">Under 2 Hours</button>
      <button @click="queryByDuration('>=', 2)">Over 2 Hours</button>
    </div>

    <div class="filter-controls">
      <label> Filter By Gerne: </label>
      <input type="text" v-model="gerneFilter" placeholder="Enter gerne" />
      <button @click="queryByGerne">Apply</button>
    </div>

    <div class="movie-list">
      <Movie
        v-for="movie in queryList"
        :key="movie.title"
        :title="movie.title"
        :releaseYear="movie.releaseYear"
        :rating="movie.rating"
        :genre="movie.gerne"
        :durationH="movie.durationHour"
        :durationM="movie.durationMinute"    
      />
    </div>
  </div>
</template>

<script>
import { query, collection, getDocs, where } from 'firebase/firestore';
import { db } from '@/firebase/init';
import Movie from '@/components/Movie.vue';

export default {        
  name: "MovieListView",
  components: { Movie },
  data() {
    return {
      movieList: [],
      queryList: [],
      gerneFilter: " ", 
      comparison: "=",
      durationLength: 0,              
    };
  },
  created() {
    this.getAllMovies();
  },
  methods: {
    async queryByDuration(comparison, durationLength) {
      try {
        this.queryList = [];

        const q = query(
          collection(db, 'movie-database'),
          where("durationHour", comparison, durationLength)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          this.queryList.push(doc.data());
        });
      } catch (error) {
        console.error("Error querying movies by duration:", error);
      }
    },

    async queryByGerne() {
      this.queryList = [];
      const q = query(
        collection(db, 'movie-database'),
        where("gerne", "array-contains", this.gerneFilter)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        this.queryList.push(doc.data());
      });
    },

   async getAllMovies() {
      try {
        const q = query(collection(db, 'movies'));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(doc => {
          this.movieList.push(doc.data());
        })
        console.log(this.movieList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

  }
};
</script>

<style>
.container {
  width: 90%;
  max-width: 1200px;
  margin: 2em auto;
  padding: 2em;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.filter-controls {
  margin-bottom: 1em;
}

.filter-controls button {
  background-color: #2c7a7b;
  color: white;
  padding: 0.5em 1.5em;
  margin: 0.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-controls button:hover {
  background-color: #285e61;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}

.movie-item {
  flex: 1 1 200px;
  padding: 1em;
  margin: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #e6fffa;
}
</style>
