<template>
  <div id="schedulerItemInsertion" class="field">
    <div class="card bg-dark mb-3 addition-form">
      <h5 class="card-header text-white text-center">Edit Scheduler Item</h5>
      <div class="card-body">
        <div class="input">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="input">
          <label for="subject">Subject</label>
          <input type="text" id="subject" v-model="subject" />
        </div>
        <div class="input">
          <label for="body">Body</label>
          <textarea class="form-control" rows="7" type="text" id="body" v-model="body" />
        </div>
        <div class="row">
          <div class="input">
            <label for="executionFrequency">Execution Frequency:</label>
            <select class="form-control" id="executionFrequency" v-model="executionFrequency">
              <option
                v-for="(item, index) in executionFrequencies"
                :key="index"
                :label="item.value"
              >{{item.id}}</option>
            </select>
          </div>
          <div class="input">
            <label for="executionHours">Execution Hours</label>
            <select class="form-control" id="executionHours" v-model="executionHours">
              <option v-for="n in 24" :key="n">{{n-1}}</option>
            </select>
          </div>
          <div class="input">
            <label for="executionMinutes">Execution Minutes</label>
            <select class="form-control" id="executionMinutes" v-model="executionMinutes">
              <option v-for="n in 60" :key="n">{{n-1}}</option>
            </select>
          </div>
          <div class="input" v-if="executionFrequency == 2">
            <label for="executionDayOfWeek">Execution Day:</label>
            <select class="form-control" id="executionDayOfWeek" v-model="executionDayOfWeek">
              <option
                v-for="(item, index) in daysOfWeek"
                :key="index"
                :label="item.value"
              >{{item.id}}</option>
            </select>
          </div>
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
import scheduler from "../../scheduler.js";

export default {
  data() {
    return {
      idSchedulerItem: this.$route.params.idSchedulerItem,
      name: null,
      subject: null,
      body: null,
      executionFrequency: null,
      executionHours: null,
      executionMinutes: null,
      executionDayOfWeek: null,
      dayOfWeek: null
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        idSchedulerItem: this.idSchedulerItem,
        name: this.name,
        subject: this.subject,
        body: this.body,
        executionFrequency: this.executionFrequency,
        executionHours: this.executionHours,
        executionMinutes: this.executionMinutes,
        executionDayOfWeek: this.executionDayOfWeek.id
      };
      Axios.put(`scheduler/items`, formData)
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
  },
  computed: {
    executionFrequencies() {
      return scheduler.executionFrequencies();
    },
    daysOfWeek() {
      return scheduler.daysOfWeek();
    }
  },
  mounted() {
    Axios.get(`/scheduler/items/${this.idSchedulerItem}`)
      .then(response => {
        this.name = response.data.name;
        this.subject = response.data.message.subject;
        this.body = response.data.message.body;
        this.executionFrequency = response.data.settings.executionFrequency;
        this.executionHours = response.data.settings.executionHours;
        this.executionMinutes = response.data.settings.executionMinutes;
        this.executionDayOfWeek = response.data.settings.executionDayOfWeek;
      })
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
</style>