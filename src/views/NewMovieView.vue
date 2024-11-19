<template>
    <div>
      <div v-if="!signUpSuccess">
        <SignUpForm @SignUp="userSignUp" />
        <p v-if="signUpError">{{ signUpError }}</p>
      </div>
      <div v-else>
        <h1>Add Movie Form</h1>
        <MovieForm />
      </div>
    </div>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase/init";
  import SignUpForm from "@/components/SignUpForm.vue";
  import MovieForm from "@/components/MovieForm.vue";
  
  export default {
    components: { SignUpForm, MovieForm },
    data() {
      return {
        signUpSuccess: false,
        userName: '',
        signUpError: ''
      };
    },
    methods: {
      async userSignUp(signUpObj) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, signUpObj.email, signUpObj.password);
          this.userName = userCredential.user.email;
          this.signUpSuccess = true;
          this.signUpError = '';
          alert(`Successful sign up for ${this.userName}`);
        } catch (error) {
          this.userName = '';
          this.signUpError = error.message;
          this.signUpSuccess = false;
        }
      }
    }
  };
  </script>
  