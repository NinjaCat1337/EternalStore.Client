<template>
  <div id="app">
    <component-header></component-header>
    <router-view></router-view>
    <component-dialogue></component-dialogue>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    componentHeader: Header
  },
  created(){
    this.$store.dispatch('resumeSession');
  }
}
</script>

<style>
body {
  height: 100%;
}
</style>
