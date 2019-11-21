<template>
  <div>
    <div v-for="category in categories" :key="category.id">
      {{category.name}}
      <component-products-for-category :idCategory="category.id"></component-products-for-category>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import ProductsForCategory from './ProductsForCategory.vue';

export default {
  data(){
    return{
      categories: []
    }
  },
  mounted(){
    Axios
      .get('https://localhost:44346/api/store/categories')
      .then(response => (this.categories = response.data));
  },
  components: {
    componentProductsForCategory: ProductsForCategory
  }
};
</script>

<style scoped>
</style>