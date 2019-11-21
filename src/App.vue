<template>
  <div id="app">
    <component-header></component-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    componentHeader: Header
  }
}
</script>

<style>
body {
  height: 100%;
}
</style>
