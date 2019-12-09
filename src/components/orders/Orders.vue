<template>
  <div class="field">
    <div class="card text-white bg-dark mb-1">
      <span class="row text-center">
        <!-- <div class="input">
          <label for="orderDateFrom">Order Date (From)</label>
          <input
            class="text-center"
            type="datetime-local"
            id="orderDateFrom"
            v-model="orderDateFrom"
          />
        </div>
        <div class="input">
          <label for="orderDateTo">Order Date (To)</label>
          <input class="text-center" type="datetime-local" id="orderDateTo" v-model="orderDateTo" />
        </div>
        <div class="input">
          <label for="deliveryDateTo">Delivery Date (To)</label>
          <input
            class="text-center"
            type="datetime-local"
            id="deliveryDateTo"
            v-model="deliveryDateTo"
          />
        </div>
        <div class="input">
          <label for="deliveryDateFrom">Delivery Date (To)</label>
          <input
            class="text-center"
            type="datetime-local"
            id="deliveryDateFrom"
            v-model="deliveryDateFrom"
          />
        </div>-->
      </span>
      <table class="table table-dark">
        <thead>
          <tr class="text-center">
            <th scope="col">Id Order</th>
            <th scope="col">Order Date</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Approved</th>
            <th scope="col">Delivered</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in filteredOrders" :key="index">
            <th scope="row">{{order.idOrder}}</th>
            <td>{{order.orderDate}}</td>
            <td>{{order.deliveryDate}}</td>
            <td>{{order.isApproved}}</td>
            <td>{{order.isDelivered}}</td>
            <td>
              <button
                class="btn-main-dark btn-main-hover-green mr-1"
                v-if="!order.isApproved"
                @click="setApproved(order.idOrder, index)"
              >Approve</button>
              <button
                class="btn-main-dark btn-main-hover-blue mr-1"
                v-if="!order.isDelivered && order.isApproved"
                @click="setDelievered(order.idOrder, index)"
              >Set Delivered</button>
              <router-link
                class="btn-main-dark btn-main-hover-yellow mr-1"
                :to="{ name: 'orderdetails', params: {idOrder: order.idOrder}}"
                tag="button"
              >Details</router-link>
            </td>
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
      orderDateFrom: new Date(),
      orderDateTo: new Date(),
      deliveryDateFrom: new Date(),
      deliveryDateTo: new Date(),
      orders: []
    };
  },
  methods: {
    setApproved(idOrder, index) {
      Axios.patch(`order/orders/${idOrder}/approved`)
        .then((this.orders[index].isApproved = true))
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    setDelievered(idOrder, index) {
      Axios.patch(`order/orders/${idOrder}/delivered`)
        .then((this.orders[index].isDelivered = true))
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    }
  },
  computed: {
 
  },
  mounted() {
    Axios.get(`/order/orders`).then(response => (this.orders = response.data));
  }
};
</script>

<style scoped>
.inner-header {
  height: 100px;
}

.inner-field {
  width: 98%;
  align-self: center;
}
</style>