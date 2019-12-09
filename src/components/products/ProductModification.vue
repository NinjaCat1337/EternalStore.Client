<template>
  <div id="categoryinsertion">
    <div class="card bg-dark mb-3 modification-form">
      <h5 class="card-header text-white text-center">Edit Product</h5>
      <div class="card-body">
       <div class="input">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="input">
          <label for="description">Description</label>
          <input type="text" id="description" v-model="description" />
        </div>
        <div class="input">
          <label for="price">Price</label>
          <input type="number" id="price" v-model="price" />
        </div>
      </div>
      <div class="card-footer text-center">
        <button class="btn-main-dark btn-main-hover-green mr-1" @click="onSubmit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../routes.js";
import Axios from "axios";

export default {
  data() {
    return {
      idProduct: this.$route.params.idProduct,
      name: "",
      description: "",
      price: null,
      idCategory: this.$route.params.idCategory
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        idProduct: this.idProduct,
        idCategory: this.idCategory,
        name: this.name,
        description: this.description,
        price: this.price
      };
      Axios.put(`store/categories/${this.idCategory}/products/${this.idProduct}`, formData)
        .then(router.replace('/store'))
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
    Axios.get(`/store/categories/${this.idCategory}/products/${this.idProduct}`)
      .then(response => {
        this.name = response.data.name;
        this.description = response.data.description;
        this.price = response.data.price;
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
.modification-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}
</style>