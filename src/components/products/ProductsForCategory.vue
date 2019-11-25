<template>
  <div>
    <div v-for="(product, index) in products" :key="index">{{product.name}}</div>
  </div>
</template>

<script>
import Axios from 'axios';
//import Product from "./Product.vue";

export default {
  props: ["idCategory"],
  data() {
    return {
      products: []
    };
  },
  components: {
    //componentProduct: Product
  },
  mounted(){
    Axios
      .get('/store/categories/'+ this.idCategory + '/products')
      .then(response => (this.products = response.data));
  },
};
</script>

<style scoped>
</style>