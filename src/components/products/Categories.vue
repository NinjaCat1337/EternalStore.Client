<template>
  <div class="field">
    <div class="card text-white bg-dark mb-3" v-for="(category, index) in categories" :key="index">
      <h5 class="card-header">{{category.name}}</h5>
      <div class="card-body">
        <component-products-for-category :idCategory="category.id"></component-products-for-category>
      </div>
      <div class="card-footer text-right">
        <router-link
          class="btn btn-light mr-1"
          :to="{name: 'addproduct', params: {idCategory: category.id}}"
          tag="button"
        >Add Product</router-link>
        <router-link
          class="btn btn-light mr-1"
          :to="{ name: 'editcategory', params: {idCategory: category.id}}"
          tag="button"
        >Edit Category</router-link>
        <button class="btn btn-light mr-1" v-if="!category.isEnabled" @click="enableCategory(category, index)">Enable</button>
        <button class="btn btn-light" v-else @click="disableCategory(category, index)">Disable</button>
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
      Axios.delete("/store/categories/" + category.id)
      .then(this.categories[index].isEnabled = true);
    },
    disableCategory(category, index) {
      console.log(category);
      Axios.delete("/store/categories/" + category.id)
      .then(this.categories[index].isEnabled = false);
    }
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
.field {
  padding-top: 1%;
  padding-left: 15%;
  padding-right: 15%;
}
</style>