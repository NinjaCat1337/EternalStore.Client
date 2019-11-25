<template>
  <div class="grid">
    <div v-for="category in categories" :key="category.id">
      {{category.name}}
      <component-products-for-category :idCategory="category.id"></component-products-for-category>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import ProductsForCategory from "./ProductsForCategory.vue";

export default {
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    Axios.get("/store/categories").then(
      response => (this.categories = response.data)
    );
  },
  components: {
    componentProductsForCategory: ProductsForCategory
  }
};
</script>

<style scoped>
.grid {
  padding-left: 15%;
  padding-right: 15%;
}
</style>