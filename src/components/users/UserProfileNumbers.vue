<template>
  <div>
    <h5 class="card-header text-white text-center">Numbers</h5>
    <div
      class="number-item card text-white bg-secondary mb-2 mt-2"
      v-for="(number, index) in numbers"
      :key="index"
      @click="removeNumber(number, index)"
    >{{number.number}}</div>
    <div class="input">
      <label for="number">New Number</label>
      <input type="text" id="number" v-model="newNumber" />
    </div>
    <div class="text-center">
      <button
        class="btn-main-dark btn-main-hover-green text-center mr-1"
        @click="addNumber()"
      >Add New</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      numbers: [],
      newNumber: ""
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
          this.numbers = response.data.userNumbers;
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
    addNumber() {
      const formData = {
        idUser: this.idUser,
        userNumber: this.newNumber
      };
      Axios.post(`/user/${this.idUser}/number`, formData)
        .then(response => {
          if (response.status === 200) {
            const newElement = {
              id: response.data,
              number: this.newNumber,
              userId: this.idUser
            };
            this.numbers.push(newElement);
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
    removeNumber(number, index) {
      Axios.delete(
        `/user/${number.userId}/number?idUser=${number.userId}&idUserNumber=${number.id}`
      )
        .then(response => {
          if (response.status === 200) {
            this.numbers.splice(index, 1);
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
.number-item:hover {
  background-color: #e43838 !important;
}
</style>