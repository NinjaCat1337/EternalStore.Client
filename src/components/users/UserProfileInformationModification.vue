<template>
  <div>
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
    <div class="text-center">
      <button class="btn-main-dark btn-main-hover-red text-center mr-1" @click="close()">Cancel</button>
      <button
        class="btn-main-dark btn-main-hover-green text-center mr-1"
        @click="changeInformation()"
      >Confirm</button>
    </div>
    <hr />
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: ""
    };
  },
  computed: {
    idUser() {
      return this.$store.getters.idUser;
    }
  },
  methods: {
    close() {
      this.$emit("informationModificationSetOff", false);
    },
    loadData() {
      Axios.get(`/user/${this.idUser}`)
        .then(response => {
          this.firstName = response.data.userInformation.firstName;
          this.lastName = response.data.userInformation.lastName;
          this.email = response.data.userInformation.email;
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
    changeInformation() {
      const formData = {
        idUser: this.idUser,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      };
      Axios.put(`/user/${this.idUser}/information`, formData)
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