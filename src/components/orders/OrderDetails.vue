<template>
  <div class="field">
    <div class="card text-white bg-dark mb-3 text-center">
      <h5 class="card-header">Contact Details</h5>
      <div class="card-body">
        <span class="row">
          <div class="input upper-input">
            <label for="orderDate">Order Date</label>
            <input
              class="text-center"
              type="datetime-local"
              id="orderDate"
              v-model="orderDate"
              :disabled="true"
            />
          </div>
          <div class="input upper-input">
            <label for="deliveryDate">Delivery Date</label>
            <input
              class="text-center"
              type="datetime-local"
              id="deliveryDate"
              v-model="deliveryDate"
              :disabled="true"
            />
          </div>
          <div class="input upper-input">
            <label for="customerName">Name</label>
            <input type="text" id="customerName" v-model="customerName" :disabled="true" />
          </div>
          <div class="input upper-input">
            <label for="customerNumber">Phone</label>
            <input type="text" id="customerNumber" v-model="customerNumber" :disabled="true" />
          </div>
        </span>
        <div class="input">
          <label for="customerAddress">Address</label>
          <input type="text" id="customerAddress" v-model="customerAddress" :disabled="true" />
        </div>
        <div class="input">
          <label for="additionalInformation">Additional Information</label>
          <textarea
            id="additionalInformation"
            class="form-control"
            rows="3"
            v-model="additionalInformation"
            :disabled="true"
          ></textarea>
        </div>
      </div>
      <h5 class="card-header">Order #{{idOrder}}</h5>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(orderItem, index) in orderItems" :key="index">
            <th scope="row">{{index + 1}}</th>
            <td>{{orderItem.productName}}</td>
            <td>{{orderItem.qty}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      idOrder: this.$route.params.idOrder,
      orderDate: new Date(),
      deliveryDate: new Date(),
      customerName: "",
      customerAddress: "",
      customerNumber: "",
      additionalInformation: "",
      orderItems: []
    };
  },
  mounted() {
    Axios.get(`order/orders/${this.idOrder}`)
      .then(response => {
        this.orderDate = response.data.orderDate;
        this.deliveryDate = response.data.deliveryDate;
        this.customerName = response.data.customerName;
        this.customerAddress = response.data.customerAddress;
        this.customerNumber = response.data.customerNumber;
        this.additionalInformation = response.data.additionalInformation;
        this.orderItems = response.data.orderItems;
      })
      .catch(error => {
        const params = {
          title: "Error!",
          text: error.response.data.error,
          type: "error"
        };
        this.$dialogue.show(params);
      });
  }
};
</script>

<style scoped>
.upper-input {
  min-width: 45%;
}
</style>