<template>
    <div>
        <h2>Add new movie </h2>
        <form @submit.prevent="addMovie">
            <label>Title:</label>
            <input type="text" v-model="newMovie.title" required />

            <label>Release Year:</label>
            <input type="number" v-model="newMovie.releaseYear" required />

            <label>Duration (Hours):</label>
            <input type="text" v-model="newMovie.durationHour" required />

            <label>Duration (Minutes):</label>
            <input type ="text" v-model="newMovie.durationMinute" required />

            <label>Gerne: </label>
            <select v-model="newMovie.gerne" multiple>
                <option v-for="gerne in movieGenres" :value="gerne" :key="gerne">{{ gerne }}</option>    
            </select>

            <label>Rating:</label>
            <select v-model="newMovie.rating">
                <option value="G"> G </option>
                <option value="PG"> PG </option>
                <option value="PG-13"> PG-13 </option>
                <option value="R"> R </option>
                <option value="NC-17"> NC-17 </option>
            </select>

            <button type ="submit">Add Movie</button>
        </form>
    </div>
</template>

<script>
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/init';

export default{
    name: "MovieForm",
    data() {
        return {
            newMovie: {
                title: "",
                releaseYear: "",
                durationHour: null,
                durationMinute: null,
                gerne: [],
                rating: ""
            },

            movieGenres: ["Action", "Comedy", "Drama", "Horror", "Romance", "Thriller"]
        };
    },

    methods: {
        resetNewMovie() {
            this.newMovie = {
                title: "",
                releaseYear: "",
                durationHour: null,
                durationMinute: null,
                gerne: [],
                rating: ""
            };
        },

        async addMovie() {
            await addDoc(collection(db, 'movie-database'), this.newMovie);
            this.$router.push('/movie-list');
            this.resetNewMovie();
        }
    }
};

</script>