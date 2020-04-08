<template>
  <div id="schedulerItemInsertion" class="field">
    <div class="card bg-dark mb-3 addition-form">
      <h5 class="card-header text-white text-center">Add New Scheduler Item</h5>
      <div class="card-body">
        <div class="input">
          <label for="name">Name</label>
          <input type="name" id="name" v-model="name" />
        </div>
        <div class="input">
          <label for="subject">Subject</label>
          <input type="subject" id="subject" v-model="subject" />
        </div>
        <div class="input">
          <label for="body">Body</label>
          <input type="body" id="body" v-model="body" />
        </div>
        <div class="input">
          <label for="executionFrequency">Execution Frequency</label>
          <input type="executinFrequency" id="executionFrequency" v-model="executionFrequency" />
        </div>
        <div class="input">
          <label for="executionHours">Execution Hours</label>
          <input type="executionHours" id="executionHours" v-model="executionHours" />
        </div>
        <div class="input">
          <label for="executionMinutes">Execution Minutes</label>
          <input type="executionMinutes" id="executionMinutes" v-model="executionMinutes" />
        </div>
        <div class="input">
          <label for="executionDayOfWeek">Execution Day Of Week</label>
          <input type="executionDayOfWeek" id="executionDayOfWeek" v-model="executionDayOfWeek" />
        </div>
      </div>
      <div class="card-footer text-center">
        <button class="btn-main-dark btn-main-hover-green mr-1" @click="onSubmit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import router from "../../routes.js";

export default {
  data() {
    return {
      name: "",
      subject: "",
      body: "",
      executionFrequency: "",
      executionHours: "",
      executionMinutes: "",
      executionDayOfWeek: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        subject: this.subject,
        body: this.body,
        executionFrequency: this.executionFrequency,
        executionHours: this.executionHours,
        executionMinutes: this.executionMinutes,
        executionDayOfWeek: this.executionDayOfWeek
      };
      Axios.post(`scheduler/items`, formData)
        .then(router.replace("/scheduler"))
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
</style>