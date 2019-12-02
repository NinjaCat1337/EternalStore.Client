<template>
  <div>
    <div class="row">
      <div
        class="order-item card text-white bg-secondary mb-3 ml-3 mr-3"
        v-for="(orderItem, index) in orderItems"
        :key="index"
      >
        <h5 class="card-header text-center">{{orderItem.name}}</h5>
        <div class="card-body">
          <p
            class="card-text"
          >Quality: {{orderItem.qty}}, Price: {{orderItem.price * orderItem.qty}} $</p>
        </div>
        <div class="card-footer text-right">
          <button
            class="btn-main-dark btn-main-hover-blue mr-1"
            :disabled="orderItem.qty<=1"
            @click="decrement(index)"
          >-</button>
          <button class="btn-main-dark btn-main-hover-blue mr-1" @click="increment(index)">+</button>
          <button class="btn-main-dark btn-main-hover-red" @click="remove(index)">Remove</button>
        </div>
      </div>
    </div>
    <h5 class="card-header">Total Price: {{totalPrice}} $</h5>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["orderItems", "totalPrice"])
  },
  methods: {
    increment(index) {
      this.$store.dispatch("incrementQty", index);
    },
    decrement(index) {
      this.$store.dispatch("decrementQty", index);
    },
    remove(index) {
      this.$store.dispatch("removeItem", index);
    }
  }
};
</script>

<style scoped>
.order-item {
  min-width: 30%;
}
</style>