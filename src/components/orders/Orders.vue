<template>
  <div class="field">
    <div class="card text-white bg-dark mb-1">
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
          <tr v-for="(order, index) in orders" :key="index">
            <th scope="row">{{order.idOrder}}</th>
            <td>{{order.orderDate}}</td>
            <td>{{order.deliveryDate}}</td>
            <td>{{order.isApproved}}</td>
            <td>{{order.isDelivered}}</td>
            <td class="text-center">
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
      <nav class="row justify-content-center">
        <ul class="pagination">
          <li class="page-item">
            <button
              class="btn-main-light"
              :class="{'btn-main-hover-red': currentPage === 1, 'btn-main-hover-green': currentPage !== 1}"
              :disabled="currentPage === 1"
              @click="switchPage(currentPage - 1)"
            >Back</button>
          </li>
          <li class="page-item" v-for="index in pages" :key="index">
            <button
              :class="{
                'btn-main-dark btn-main-hover-red': currentPage === index, 
                'btn-main-light btn-main-hover-green': currentPage !== index}"
                :disabled="index === currentPage"
              @click="switchPage(index)"
            >{{index}}</button>
          </li>
          <li class="page-item">
            <button
              class="btn-main-light"
              :class="{'btn-main-hover-red': currentPage === pages, 'btn-main-hover-green': currentPage !== pages}"
              :disabled="currentPage === pages"
              @click="switchPage(currentPage + 1)"
            >Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
const ordersOnPageCount = 10;

export default {
  data() {
    return {
      pages: 1,
      currentPage: 1,
      ascending: false,
      orders: []
    };
  },
  methods: {
    switchPage(index) {
      Axios.get(
        `/order/orders?count=${ordersOnPageCount}&page=${index}&ascending=${this.ascending}`
      ).then(response => {
        this.orders = response.data.orders;
        this.pages = Math.ceil(response.data.ordersCount / ordersOnPageCount);
        this.currentPage = index;
      });
    },
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
  computed: {},
  mounted() {
    Axios.get(
      `/order/orders?count=${ordersOnPageCount}&page=${this.currentPage}&ascending=${this.ascending}`
    ).then(response => {
      this.orders = response.data.orders;
      this.pages = Math.ceil(response.data.ordersCount / ordersOnPageCount);
    });
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