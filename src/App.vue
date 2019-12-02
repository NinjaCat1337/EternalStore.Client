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
.field {
  padding-top: 1%;
  padding-left: 15%;
  padding-right: 15%;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #eee;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #343a40;
  background-color: #eee;
}

.btn-main-light {
color: #494949 !important;
text-decoration: none;
background: #ffffff;
padding: 5px;
border: 1px solid #494949 !important;
display: inline-block;
transition: all 0.4s ease 0s;
}

.btn-main-dark {
color: #ffffff !important;
text-decoration: none;
background: #494949;
padding: 5px;
border: 1px solid #ffffff !important;
display: inline-block;
transition: all 0.4s ease 0s;
}

.btn-main-hover-blue:hover {
color: #ffffff !important;
background: #5238e4;
border-color: #5238e4 !important;
transition: all 0.4s ease 0s;
}

.btn-main-hover-red:hover {
color: #ffffff !important;
background: #e43838;
border-color: #e43838 !important;
transition: all 0.4s ease 0s;
}

.btn-main-hover-yellow:hover {
color: #ffffff !important;
background: #e4d938;
border-color: #e4d938 !important;
transition: all 0.4s ease 0s;
}

.btn-main-hover-green:hover {
color: #ffffff !important;
background: #38e438;
border-color: #38e438 !important;
transition: all 0.4s ease 0s;
}
</style>
