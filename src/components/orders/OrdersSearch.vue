<template>
  <div id="accordion">
    <div class="card bg-dark">
      <div class="card-header" id="headingOne">
        <div class="mb-0 text-left">
          <button
            class="btn-main-dark btn-main-hover-green"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >Search</button>
        </div>
      </div>
      <div
        id="collapseOne"
        class="collapse show"
        aria-labelledby="headingOne"
        data-parent="#accordion"
      >
        <div class="card-body">
          <div class="row text-center">
            <div class="input upper-input">
              <label for="orderDateFrom">Order Date From</label>
              <input
                class="text-center"
                type="datetime-local"
                id="orderDateFrom"
                v-model="orderDateFrom"
              />
            </div>
            <div class="input upper-input">
              <label for="orderDateTo">Order Date To</label>
              <input
                class="text-center"
                type="datetime-local"
                id="orderDateTo"
                v-model="orderDateTo"
              />
            </div>
            <div class="input upper-input">
              <label for="deliveryDateFrom">Delivery Date From</label>
              <input
                class="text-center"
                type="datetime-local"
                id="deliveryDateFrom"
                v-model="deliveryDateFrom"
              />
            </div>
            <div class="input upper-input">
              <label for="deliveryDateTo">Delivery Date To</label>
              <input
                class="text-center"
                type="datetime-local"
                id="deliveryDateTo"
                v-model="deliveryDateTo"
              />
            </div>
          </div>
          <div class="row text-white justify-content-center">
            <div class="row mr-5">
              <div class="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="isApprovedTrue"
                  name="isApprovedGroup"
                  v-model="isApproved"
                  v-bind:value="true"
                />
                <label class="custom-control-label" for="isApprovedTrue">Is Approved</label>
              </div>
              <div class="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="isApprovedFalse"
                  name="isApprovedGroup"
                  v-model="isApproved"
                  v-bind:value="false"
                />
                <label class="custom-control-label" for="isApprovedFalse">Not Approved</label>
              </div>
              <div class="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="isApprovedNull"
                  name="isApprovedGroup"
                  v-model="isApproved"
                  v-bind:value="null"
                  checked
                />
                <label class="custom-control-label" for="isApprovedNull">Any</label>
              </div>
            </div>
            <div class="row ml-5">
              <div class="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="isDeliveredTrue"
                  name="isDeliveredGroup"
                  v-model="isDelivered"
                  v-bind:value="true"
                />
                <label class="custom-control-label" for="isDeliveredTrue">Is Delivered</label>
              </div>
              <div class="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="isDeliveredFalse"
                  name="isDeliveredGroup"
                  v-model="isDelivered"
                  v-bind:value="false"
                />
                <label class="custom-control-label" for="isDeliveredFalse">Not Delivered</label>
              </div>
              <div class="custom-control custom-radio mr-3">
                <input
                  type="radio"
                  class="custom-control-input"
                  id="isDeliveredNull"
                  name="isDeliveredGroup"
                  v-model="isDelivered"
                  v-bind:value="null"
                  checked
                />
                <label class="custom-control-label" for="isDeliveredNull">Any</label>
              </div>
            </div>
          </div>
          <hr />
          <div class="row justify-content-center">
            <button class="btn-main-dark btn-main-hover-yellow mr-1" @click="clear">Clear</button>
            <button class="btn-main-dark btn-main-hover-blue mr-1" @click="find">Find</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      orderDateFrom: null,
      orderDateTo: null,
      deliveryDateFrom: null,
      deliveryDateTo: null,
      isApproved: null,
      isDelivered: null,
      ascending: false,
      searchResult: []
    };
  },
  methods: {
    clear() {
      this.orderDateFrom = null;
      this.orderDateTo = null;
      this.deliveryDateFrom = null;
      this.deliveryDateTo = null;
      this.isApproved = null;
      this.isDelivered = null;
      this.ascending = false;
    },
    find() {
      const searchData = {
        orderDateFrom: this.orderDateFrom,
        orderDateTo: this.orderDateTo,
        deliveryDateFrom: this.deliveryDateFrom,
        deliveryDateTo: this.deliveryDateTo,
        isApproved: this.isApproved,
        isDelivered: this.isDelivered,
        ascending: this.ascending
      };
      console.log(searchData);
      Axios.post(`store/orders/search`, searchData)
        .then(result => {
          this.searchResult = result.data.orders;
          console.log(result);
          this.$emit("setFindedOrdersToOrdersList", this.searchResult);
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
  }
};
</script>

<style scoped>
</style>