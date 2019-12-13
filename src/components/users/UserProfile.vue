<template>
  <div id="profile">
    <div class="card bg-dark mb-3 profile-form">
      <div class="row card-header justify-content-end">
        <button
          class="btn-main-dark btn-main-hover-yellow mr-1"
          @click="informationModification = true"
          v-if="!informationModification"
        >Change Information</button>
        <button
          class="btn-main-dark btn-main-hover-yellow mr-1"
          @click="loginModification = true"
          v-if="!loginModification"
        >Change Login</button>
        <button
          class="btn-main-dark btn-main-hover-yellow mr-1"
          @click="passwordModification = true"
          v-if="!passwordModification"
        >Change Password</button>
      </div>
      <div class="card-body">
        <login-modification
          v-if="loginModification"
          :loginModification="loginModification"
          @loginModificationSetOff="loginModification = $event"
        ></login-modification>
        <password-modification
          v-if="passwordModification"
          :passwordModification="passwordModification"
          @passwordModificationSetOff="passwordModification = $event"
        ></password-modification>
        <information-modification
          v-if="informationModification"
          :informationModification="informationModification"
          @informationModificationSetOff="informationModification = $event"
        ></information-modification>
        <user-addresses></user-addresses>
        <user-numbers></user-numbers>
      </div>
    </div>
  </div>
</template>

<script>
import LoginModification from "./UserProfileLoginModification.vue";
import PasswordModification from "./UserProfilePasswordModification.vue";
import InformationModification from "./UserProfileInformationModification.vue";
import UserAddresses from "./UserProfileAddresses.vue";
import UserNumbers from "./UserProfileNumbers.vue";

export default {
  data() {
    return {
      loginModification: false,
      passwordModification: false,
      informationModification: false
    };
  },
  components: {
    LoginModification,
    PasswordModification,
    InformationModification,
    UserAddresses,
    UserNumbers
  }
};
</script>

<style scoped>
.profile-form {
  width: 500px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
</style>