<template>
    <div>
      <h2>Please Sign Up to Add a Movie</h2>
      <label>Email:</label>
      <input type="email" v-model="signUpEmail" />
      <label>Password:</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="signUpPassword" />
      <p v-show="!signUpStatus">Missing Email or Password</p>
      <button @click="signUp">Sign Up</button>
      <button @click="togglePasswordVisibility">Toggle Password</button>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['SignUp'],
    data() {
      return {
        signUpEmail: '',
        signUpPassword: '',
        showPassword: false,
      };
    },
    computed: {
      signUpStatus() {
        return this.signUpEmail && this.signUpPassword;
      },
    },
    methods: {
      signUp() {
        if (this.signUpStatus) {
          this.$emit('SignUp', {
            email: this.signUpEmail,
            password: this.signUpPassword
          });
        }
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      }
    }
  };
  </script>
  