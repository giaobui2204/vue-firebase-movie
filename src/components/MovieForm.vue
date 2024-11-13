<template>
    <div>
      <form @submit.prevent="addMovie">
        <label>Title:</label>
        <input type="text" v-model="newMovie.title" required />
  
        <label>Release Year:</label>
        <input type="number" v-model="newMovie.releaseYear" required />
  
        <label>Duration (Hours):</label>
        <input type="number" v-model="newMovie.durationHour" required />
  
        <label>Duration (Minutes):</label>
        <input type="number" v-model="newMovie.durationMinute" required />
  
        <label>Genre:</label>
        <select v-model="newMovie.genre" multiple>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
        </select>
  
        <label>Rating:</label>
        <select v-model="newMovie.rating">
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </select>
  
        <button type="submit">Add Movie</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addDoc, collection } from 'firebase/firestore';
  import { db } from '../firebase/init';
  
  export default {
    name: "MovieForm",
    data() {
      return {
        newMovie: {
          title: "",
          releaseYear: "",
          durationHour: null,
          durationMinute: null,
          genre: [],
          rating: ""
        }
      };
    },
    methods: {
      resetNewMovie() {
        this.newMovie = {
          title: "",
          releaseYear: "",
          durationHour: null,
          durationMinute: null,
          genre: [],
          rating: ""
        };
      },
      async addMovie() {
        try {
          await addDoc(collection(db, 'movie-database'), this.newMovie);
          this.$emit('movie-added', { ...this.newMovie });
          this.resetNewMovie();
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      }
    }
  };
  </script>
  
<style>
.form-container {
    max-width: 600px;
    margin: 2em auto;
    padding: 2em;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
}

.form-container h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5em;
}

.form-group {
    margin-bottom: 1em;
}

.form-group label {
    display: block;
    font-weight: bold;
    color: #555;
    margin-bottom: 0.5em;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
}

.form-group select[multiple] {
    height: 100px;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.submit-button {
    width: 100%;
    padding: 0.75em;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #2563eb;
}

.submit-button:active {
    background-color: #1d4ed8;
}
</style>