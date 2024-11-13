<template>
<div>
    <h1>Add New Movie</h1>
    <MovieForm />
</div>
</template>

<script>
import MovieForm from '../components/MovieForm.vue';

export default {
    name: 'NewMovieView',
    components: {
        MovieForm
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