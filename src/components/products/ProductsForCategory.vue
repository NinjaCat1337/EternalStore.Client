<template>
  <div class="row">
    <div
      class="product-item card text-white bg-secondary mb-3 ml-3 mr-3"
      v-for="(product, index) in products"
      :key="index"
    >
      <h5 class="card-header text-center">{{product.name}}</h5>
      <div class="card-body">
        <p class="card-text">{{product.description}}</p>
        <p class="card-text">Price: {{product.price}} $</p>
      </div>
      <div class="card-footer text-right">
        <button
          class="btn-main-dark btn-main-hover-blue mr-1"
          @click="addToCart(product)"
        >Add To Cart</button>
        <router-link
          class="btn-main-dark btn-main-hover-yellow mr-1"
          :to="{name: 'editproduct', params: {idCategory, idProduct: product.idProduct}}"
          tag="button"
        >Edit Product</router-link>
        <button class="btn-main-dark btn-main-hover-red" @click="tryRemoveProduct(product)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  props: ["idCategory"],
  data() {
    return {
      products: []
    };
  },
  methods: {
    tryRemoveProduct(product) {
      const params = {
        title: "Attention!",
        text: "Are you sure to delete this item?",
        type: "confirm",
        onConfirm: () => {
          return this.removeProduct(product);
        }
      };
      this.$dialogue.show(params);
    },
    removeProduct(product) {
      Axios.delete(
        "/store/categories/" + this.idCategory + "/products/" + product.idProduct
      )
        .then(this.products.splice(this.products.indexOf(product), 1))
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    addToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    }
  },
  mounted() {
    Axios.get("/store/categories/" + this.idCategory + "/products")
      .then(response => (this.products = response.data))
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
.product-item {
  min-width: 30%;
}
</style>