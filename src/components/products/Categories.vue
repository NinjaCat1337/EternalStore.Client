<template>
  <div class="field">
    <div class="card text-white bg-dark mb-3" v-for="(category, index) in categories" :key="index">
      <h5 class="card-header">{{category.name}}</h5>
      <div class="card-body">
        <component-products-for-category :idCategory="category.idCategory"></component-products-for-category>
      </div>
      <div class="card-footer text-right">
        <router-link
          class="btn-main-dark btn-main-hover-green mr-1"
          :to="{name: 'addproduct', params: {idCategory: category.idCategory}}"
          tag="button"
        >Add Product</router-link>
        <router-link
          class="btn-main-dark btn-main-hover-yellow mr-1"
          :to="{ name: 'editcategory', params: {idCategory: category.idCategory}}"
          tag="button"
        >Edit Category</router-link>
        <button
          class="btn-main-dark btn-main-hover-blue mr-1"
          v-if="!category.isEnabled"
          @click="enableCategory(category, index)"
        >Enable</button>
        <button class="btn-main-dark btn-main-hover-red" v-else @click="disableCategory(category, index)">Disable</button>
      </div>
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
  methods: {
    enableCategory(category, index) {
      Axios.delete(`/store/categories/${category.idCategory}`)
      .then(this.categories[index].isEnabled = true)
      .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    disableCategory(category, index) {
      Axios.delete(`/store/categories/${category.idCategory}`)
      .then(this.categories[index].isEnabled = false)
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
    Axios.get(`/store/categories`).then(
      response => (this.categories = response.data)
    );
  },
  components: {
    componentProductsForCategory: ProductsForCategory
  }
};
</script>

<style scoped>

</style>