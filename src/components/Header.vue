<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="main-menu-left navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'home'}" tag="a">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'store'}" tag="a">Store</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'addcategory'}" tag="a">Add Category</router-link>
        </li>
      </ul>
      <ul class="main-menu-right navbar-nav d-flex justify-content-end">
        <li class="nav-item" v-if="!authetnicated">
          <router-link class="nav-link" :to="{name: 'login'}" tag="a">Sign In</router-link>
        </li>
        <li class="nav-item" v-if="!authetnicated">
          <router-link class="nav-link" :to="{name: 'register'}" tag="a">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="authetnicated">
          <button class="btn btn-secondary" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    authetnicated(){
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
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