<template>
  <div class="row">
    <div class="product-item card text-white bg-secondary mb-3 ml-5" v-for="(product, index) in products" :key="index">
      <h5 class="card-header">{{product.name}}</h5>
      <div class="card-body">
        <p class="card-text">{{product.description}}</p>
      </div>
      <div class="card-footer text-right">       
        <span class="mr-1">Price: {{product.price}}</span>
          <router-link
          class="btn btn-light mr-1"
          :to="{name: 'editproduct', params: {idCategory, idProduct: product.id}}"
          tag="button"
        >Edit Product</router-link>
        <button class="btn btn-light" @click="tryRemoveProduct(product)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

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
        onConfirm: () => {
          return this.removeProduct(product);
        }
      };
      this.$dialogue.show(params)
    },
    removeProduct(product){
      Axios
      .delete('/store/categories/'+ this.idCategory + '/products/' + product.id)
      .then(this.products.splice( this.products.indexOf(product), 1 ));
    }
  },
  mounted(){
    Axios
      .get('/store/categories/'+ this.idCategory + '/products')
      .then(response => (this.products = response.data));
  },
};
</script>

<style scoped>
.product-item {
max-width: 30%;
}
</style>