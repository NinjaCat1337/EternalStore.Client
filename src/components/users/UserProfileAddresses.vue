<template>
  <div>
    <h5 class="card-header text-white text-center">Addresses</h5>
    <div
      class="address-item card text-white bg-secondary mt-2 mb-2"
      v-for="(address, index) in addresses"
      :key="index"
      @click="removeAddress(address, index)"
    >{{address.address}}</div>
    <div class="input">
      <label for="address">New Address</label>
      <input type="text" id="address" v-model="newAddress" />
    </div>
    <div class="text-center">
      <button
        class="btn-main-dark btn-main-hover-green text-center mr-1"
        @click="addAddress()"
      >Add New</button>
    </div>
    <hr />
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      addresses: [],
      newAddress: ""
    };
  },
  computed: {
    idUser() {
      return this.$store.getters.idUser;
    }
  },
  methods: {
    loadData() {
      Axios.get(`/user/${this.idUser}`)
        .then(response => {
          this.addresses = response.data.userAddresses;
        })
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    addAddress() {
      const formData = {
        idUser: this.idUser,
        userAddress: this.newAddress
      };
      Axios.post(`/user/${this.idUser}/address`, formData)
        .then(response => {
          if (response.status === 200) {
            const newElement = {
              id: response.data,
              address: this.newAddress,
              userId: this.idUser
            };
            this.addresses.push(newElement);
            this.newNumber = "";
          }
        })
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    removeAddress(address, index) {
      Axios.delete(
        `/user/${address.userId}/address?idUser=${address.userId}&idUserAddress=${address.id}`
      )
        .then(response => {
          if (response.status === 200) {
            this.addresses.splice(index, 1);
          }
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
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style scoped>
.address-item:hover {
  background-color: #e43838 !important;
}
</style>