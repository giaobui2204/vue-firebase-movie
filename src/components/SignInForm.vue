<template>
    <div>
      <h2>Sign In</h2>
      <label>Email:</label>
      <input type="email" v-model="signInEmail" />
      <label>Password:</label>
      <input type="password" v-model="signInPassword" />
      <button @click="signIn">Sign In</button>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['SignIn'],
    data() {
      return {
        signInEmail: '',
        signInPassword: '',
      };
    },
    computed: {
      signInStatus() {
        return this.signInEmail && this.signInPassword;
      },
    },
    methods: {
      signIn() {
        if (this.signInStatus) {
          this.$emit('SignIn', {
            email: this.signInEmail,
            password: this.signInPassword
          });
        }
      }
    }
  };
  </script>
  