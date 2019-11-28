<template>
    <div id="productinsertion">
    <div class="addition-form">
      <form @submit.prevent="onSubmit">
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
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from '../../routes.js';
import Axios from "axios";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: null,
      idCategory: this.$route.params.idCategory
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        description: this.description,
        price: this.price,
        idCategory: this.idCategory
      };
      Axios
        .post("store/categories/" + this.idCategory + "/products", formData)
        .then(router.replace('/store'))    
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
.addition-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #343a40;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit button {
  border: 1px solid #343a40;
  color: #343a40;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #343a40;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>