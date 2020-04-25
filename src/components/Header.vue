<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="main-menu-left navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'store'}" tag="a">Store TEST</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'addcategory'}"
            v-if="userRole == 1"
            tag="a"
          >Add Category</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'orders'}" v-if="userRole == 1" tag="a">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{name: 'scheduler'}"
            v-if="userRole == 1"
            tag="a"
          >Scheduler</router-link>
        </li>
      </ul>
      <ul class="main-menu-right navbar-nav d-flex justify-content-end">
        <li class="nav-item" v-if="haveItemsInOrder">
          <router-link
            class="btn-main-light btn-main-hover-blue mr-2"
            :to="{name: 'addorder'}"
            tag="button"
          >Shopping Cart</router-link>
        </li>
        <li class="nav-item" v-if="!authetnicated">
          <router-link class="nav-link" :to="{name: 'login'}" tag="a">Sign In</router-link>
        </li>
        <li class="nav-item" v-if="!authetnicated">
          <router-link class="nav-link" :to="{name: 'register'}" tag="a">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="authetnicated">
          <router-link
            class="btn-main-light btn-main-hover-green"
            :to="{name: 'profile'}"
            tag="button"
          >My Profile</router-link>
        </li>
        <li class="nav-item" v-if="authetnicated">
          <button class="btn-main-light btn-main-hover-red" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    authetnicated() {
      return this.$store.getters.isAuthenticated;
    },
    haveItemsInOrder() {
      return this.$store.getters.haveItemsInOrder;
    },
    userRole() {
      return this.$store.getters.userRole;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
li {
  overflow: hidden;
  white-space: nowrap;
}
.main-menu-right {
  padding-right: 15%;
}
.main-menu-left {
  padding-left: 15%;
}
</style>