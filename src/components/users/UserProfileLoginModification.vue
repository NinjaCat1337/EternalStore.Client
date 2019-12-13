<template>
  <div>
    <div class="input">
      <label for="login">Login</label>
      <input type="login" id="login" v-model="login" />
    </div>
    <div class="text-center">
      <button class="btn-main-dark btn-main-hover-red text-center mr-1" @click="close()">Cancel</button>
      <button
        class="btn-main-dark btn-main-hover-green text-center mr-1"
        @click="changeLogin()"
      >Confirm</button>
    </div>
    <hr />
  </div>
</template>

<script>
import Axios from "axios";

export default {
  props: ["loginModification"],
  data() {
    return {
      login: ""
    };
  },
  computed: {
    idUser() {
      return this.$store.getters.idUser;
    }
  },
  methods: {
    close() {
      this.$emit("loginModificationSetOff", false);
    },
    loadData() {
      Axios.get(`/user/${this.idUser}`)
        .then(response => {
          this.login = response.data.login;
        })
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    changeLogin() {
      const formData = {
        idUser: this.idUser,
        login: this.login
      };
      Axios.put(`/user/${this.idUser}`, formData)
        .then(response => {
          if (response.status === 200) {
            this.close();
          }
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
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
</style>