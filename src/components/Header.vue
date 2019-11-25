<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="main-menu-left navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/" tag="a">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products" tag="a">Products</router-link>
        </li>
      </ul>
      <ul class="main-menu-right navbar-nav d-flex justify-content-end">
        <li class="nav-item">
          <router-link class="nav-link" to="/login" tag="a">Sign In</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/register" tag="a">Sign Up</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
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