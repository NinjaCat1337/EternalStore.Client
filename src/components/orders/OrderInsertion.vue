<template>
  <div class="field">
    <div class="card text-white bg-dark mb-3 text-center">
      <h5 class="card-header">Contact Details</h5>
      <div class="card-body">
        <span class="row">
          <div class="input upper-input">
            <label for="deliveryDate">Delivery Date</label>
            <input
              class="text-center"
              type="datetime-local"
              id="deliveryDate"
              v-model="deliveryDate"
            />
          </div>
          <div class="input upper-input">
            <label for="customerName">Name</label>
            <input type="text" id="customerName" v-model="customerName" />
          </div>
          <div class="input upper-input">
            <label for="customerNumber">Phone</label>
            <input type="text" id="customerNumber" v-model="customerNumber" />
          </div>
        </span>
        <div class="input">
          <label for="customerAddress">Address</label>
          <input type="text" id="customerAddress" v-model="customerAddress" />
        </div>
        <div class="input">
          <label for="additionalInformation">Additional Information</label>
          <textarea
            id="additionalInformation"
            class="form-control"
            rows="3"
            v-model="additionalInformation"
          ></textarea>
        </div>
      </div>
      <h5 class="card-header">Your Order</h5>
      <component-order-items></component-order-items>
      <div class="card-footer text-center">
        <button class="btn-main-dark btn-main-hover-green mr-1" @click="onSubmit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../routes.js";
import Axios from "axios";
import OrderItems from "./OrderItems.vue";

export default {
  data() {
    return {
      deliveryDate: new Date(),
      customerName: "",
      customerAddress: "",
      customerNumber: "",
      additionalInformation: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        deliveryDate: this.deliveryDate,
        customerName: this.customerName,
        customerAddress: this.customerAddress,
        customerNumber: this.customerNumber,
        additionalInformation: this.additionalInformation,
        orderItems: this.$store.getters.orderItems
      };
      Axios.post(`order/orders`, formData)
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
        router.replace("/store")
    }
  },
  components: {
    componentOrderItems: OrderItems
  }
};
</script>

<style scoped>
.upper-input {
  min-width: 30%;
}
</style>