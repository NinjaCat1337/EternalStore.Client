<template>
  <div id="signup">
    <div class="card bg-dark mb-3 signup-form">
      <div class="card-body">
        <div class="input">
          <label for="login">Login</label>
          <input type="login" id="login" v-model="login" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" />
        </div>
        <div class="input">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <div class="input">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" v-model="lastName" />
          </div>
          <div class="input">
            <label for="email">E-Mail</label>
            <input type="email" id="email" v-model="email" />
          </div>
        </div>
      </div>
      <div class="card-footer text-center">
        <button class="btn-main-dark btn-main-hover-green mr-1" @click="onSubmit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../routes.js";
import Axios from "axios";

export default {
  data() {
    return {
      login: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        login: this.login,
        password: this.password,
        confirmPassword: this.confirmPassword,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        terms: this.terms
      };
      Axios.post(`/user/register`, formData)
        .then(response => {
          if (response.data.success) router.replace("/login");
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
.signup-form {
  width: 500px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
</style>