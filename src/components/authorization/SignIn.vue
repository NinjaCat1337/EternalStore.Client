<template>
  <div id="signin">
    <div class="card bg-dark mb-3 signin-form">
      <div class="card-body">
        <div class="input">
          <label for="login">Login</label>
          <input type="login" id="login" v-model="login" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
      </div>
      <div class="card-footer text-center">
        <button class="btn-main-dark btn-main-hover-green mr-1" @click="onSubmit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "../../axios-auth.js";

export default {
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        login: this.login,
        password: this.password
      };
      Axios.post(`login`, formData)
        .then(response => {
          if (response.data.success)
            this.$store
              .dispatch("login", {
                token: response.data.token,
                expiresInMinutes: response.data.expiresInMinutes
              })
              .then(
                this.$store.dispatch("setLogoutTimer", {
                  expiresInMinutes: response.data.expiresInMinutes
                })
              );
        })
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    }
  }
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
</style>