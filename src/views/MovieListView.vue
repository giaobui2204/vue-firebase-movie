<template>
  <div class="container">
    <!-- Sign-in screen -->
    <div v-if="!signInSuccess">
      <SignInForm @SignIn="userSignIn" />
      <p v-if="signInError" class="error">{{ signInError }}</p>
    </div>

    <!-- Movie List screen -->
    <div v-else>
      <h1>Movie List</h1>

      <div class="movie-list content">
        <Movie
          v-for="movie in movieList"
          :key="movie.title"
          :title="movie.title"
          :releaseYear="movie.releaseYear"
          :rating="movie.rating"
          :genre="movie.genre"
          :durationH="movie.durationHour"
          :durationM="movie.durationMinute"
        />
      </div>

      <!-- Filter Buttons -->
      <div class="filter-controls">
        <button @click="queryByDuration('<', 2)">Under 2 Hours</button>
        <button @click="queryByDuration('>=', 2)">Over 2 Hours</button>
      </div>

      <!-- Genre Filter -->
      <div class="filter-controls">
        <label> Filter By Genre: </label>
        <input type="text" v-model="genreFilter" placeholder="Enter genre" />
        <button @click="queryByGenre">Apply</button>
      </div>

      <!-- Filtered Movies -->
      <div class="movie-list">
        <Movie
          v-for="movie in queryList"
          :key="movie.title"
          :title="movie.title"
          :releaseYear="movie.releaseYear"
          :rating="movie.rating"
          :genre="movie.genre"
          :durationH="movie.durationHour"
          :durationM="movie.durationMinute"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { query, collection, getDocs, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "@/firebase/init";
import Movie from "@/components/Movie.vue";
import SignInForm from "@/components/SignInForm.vue";

export default {
  name: "MovieListView",
  components: { Movie, SignInForm },
  data() {
    return {
      movieList: [],
      queryList: [],
      genreFilter: "",
      comparison: "=",
      durationLength: 0,
      signInSuccess: false,
      signInError: "",
    };
  },
  created() {
    // Fetch movies only if user is signed in
    if (this.signInSuccess) {
      this.getAllMovies();
    }
  },
  methods: {
    async userSignIn(signInObj) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, signInObj.email, signInObj.password);
        this.signInSuccess = true; // Mark sign-in as successful
        this.signInError = ""; // Clear any error messages
        alert(`Successful sign-in for ${userCredential.user.email}`);
        this.getAllMovies(); // Fetch movies after sign-in
      } catch (error) {
        console.error("Error during sign-in:", error.code, error.message);
        this.signInError = error.message; // Store the error message
        this.signInSuccess = false; // Mark sign-in as failed
      }
    },
    async queryByDuration(comparison, durationLength) {
      try {
        this.queryList = [];
        const q = query(
          collection(db, "movie-database"),
          where("durationHour", comparison, durationLength)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.queryList.push(doc.data());
        });
      } catch (error) {
        console.error("Error querying movies by duration:", error);
      }
    },
    async queryByGenre() {
      try {
        this.queryList = [];
        const q = query(
          collection(db, "movie-database"),
          where("genre", "array-contains", this.genreFilter)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.queryList.push(doc.data());
        });
      } catch (error) {
        console.error("Error querying movies by genre:", error);
      }
    },
    async getAllMovies() {
      try {
        const q = query(collection(db, "movies"));
        const querySnapshot = await getDocs(q);
        this.movieList = querySnapshot.docs.map((doc) => doc.data());
        this.queryList = [...this.movieList]; // Default queryList to full list
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
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

.error {
  color: red;
}
</style>
