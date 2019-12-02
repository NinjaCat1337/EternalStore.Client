<template>
  <div class="field">
    <div class="card text-white bg-dark mb-3" v-for="(order, index) in orders" :key="index">
      <h5 class="card-header">{{order.id}}</h5>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      orders: []
    };
  },
  mounted() {
    Axios.get("/store/orders").then(
      response => (this.orders = response.data)
    );
  }
};
</script>

<style scoped>

</style>