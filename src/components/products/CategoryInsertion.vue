<template>
  <div id="categoryinsertion">
    <div class="card bg-dark mb-3 addition-form">
      <h5 class="card-header text-white text-center">Add New Category</h5>
      <div class="card-body">
        <div class="input">
          <label for="name">Name</label>
          <input type="name" id="name" v-model="name" />
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
      name: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        name: this.name
      };
      console.log(formData);
      Axios.post(`store/categories`, formData)
        .then(router.replace("/store"))
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
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
</style>