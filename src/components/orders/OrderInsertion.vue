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
            <div class="input-group">
              <input type="text" id="customerNumber" class="form-control" v-model="customerNumber" />
              <div class="input-group-append dropleft">
                <button
                  class="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-if="authetnicated"
                ></button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    v-for="(item, index) in numbers"
                    :key="index"
                    @click="setNumber(item.number)"
                  >{{item.number}}</a>
                </div>
              </div>
            </div>
          </div>
        </span>
        <div class="input">
          <label for="customerAddress">Address</label>
          <div class="input-group">
            <input type="text" id="customerAddress" class="form-control" v-model="customerAddress" />
            <div class="input-group-append dropleft">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-if="authetnicated"
              ></button>
              <div class="dropdown-menu">
                <a
                  class="dropdown-item"
                  v-for="(item, index) in addresses"
                  :key="index"
                  @click="setAddress(item.address)"
                >{{item.address}}</a>
              </div>
            </div>
          </div>
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
      additionalInformation: "",
      addresses: [],
      numbers: []
    };
  },
  computed: {
    authetnicated() {
      return this.$store.getters.isAuthenticated;
    },
    idUser() {
      return this.$store.getters.idUser;
    }
  },
  methods: {
    loadUserData() {
      Axios.get(`/user/${this.idUser}/address`).then(
        response => (this.addresses = response.data)
      );
      Axios.get(`/user/${this.idUser}/number`).then(
        response => (this.numbers = response.data)
      );
    },
    setAddress(address) {
      this.customerAddress = address;
    },
    setNumber(number) {
      this.customerNumber = number;
    },
    onSubmit() {
      const formData = {
        deliveryDate: this.deliveryDate,
        customerName: this.customerName,
        customerAddress: this.customerAddress,
        customerNumber: this.customerNumber,
        additionalInformation: this.additionalInformation,
        orderItems: this.$store.getters.orderItems
      };
      Axios.post(`order/orders`, formData).catch(error => {
        const params = {
          title: "Error!",
          text: error.response.data.error,
          type: "error"
        };
        this.$dialogue.show(params);
      });
      router.replace("/store");
    }
  },
  components: {
    componentOrderItems: OrderItems
  },
  mounted() {
    if (this.authetnicated) {
      this.loadUserData();
    }
  }
};
</script>

<style scoped>
.upper-input {
  min-width: 30%;
}
</style>