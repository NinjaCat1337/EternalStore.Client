<template>
  <div>
    <div class="input">
      <label for="old-password">Old Password</label>
      <input type="password" id="old-password" v-model="oldPassword" />
    </div>
    <div class="input">
      <label for="password">New Password</label>
      <input type="password" id="password" v-model="newPassword" />
    </div>
    <div class="input">
      <label for="confirm-password">Confirm New Password</label>
      <input type="password" id="confirm-password" v-model="confirmNewPassword" />
    </div>
    <div class="text-center">
      <button class="btn-main-dark btn-main-hover-red text-center mr-1" @click="close()">Cancel</button>
      <button
        class="btn-main-dark btn-main-hover-green text-center mr-1"
        @click="changePassword()"
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
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  },
  computed: {
    idUser() {
      return this.$store.getters.idUser;
    }
  },
  methods: {
    close() {
      this.$emit("passwordModificationSetOff", false);
    },
    changePassword() {
      const formData = {
        idUser: this.idUser,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      Axios.post(`/user/${this.idUser}/password`, formData)
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
  }
};
</script>

<style scoped>
</style>