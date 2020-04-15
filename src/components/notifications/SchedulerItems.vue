<template>
  <div class="row">
    <div
      class="card scheduler-item text-white bg-secondary mb-3"
      v-for="(schedulerItem, index) in schedulerItems"
      :key="index"
    >
      <h5 class="card-header text-center">{{schedulerItem.name}}</h5>
      <div class="card-body">
        <p class="card-text">{{schedulerItem.message.subject}}</p>
        <p class="card-text">{{schedulerItem.message.body}}</p>
        <hr />
        <div class="row">
          <p
            class="card-text ml-3"
          >Execution Frequency: {{getExecutionFrequency(schedulerItem.settings.executionFrequency)}}</p>
          <p
            class="card-text ml-3"
            v-if="schedulerItem.settings.executionFrequency == 2"
          >Execution Day: {{getExecutionDay(schedulerItem.settings.executionFrequency)}}</p>
          <p
            class="card-text ml-3"
          >Execution Time: {{schedulerItem.settings.executionHours}}:{{schedulerItem.settings.executionMinutes}}</p>
        </div>
      </div>
      <div class="card-footer text-right">
        <button
          class="btn-main-dark btn-main-hover-green"
          v-if="userRole == 1 && !schedulerItem.isActive"
          @click="toggleIsActive(schedulerItem, index)"
        >Run</button>
        <button
          class="btn-main-dark btn-main-hover-red"
          v-if="userRole == 1 && schedulerItem.isActive"
          @click="toggleIsActive(schedulerItem, index)"
        >Stop</button>
        <router-link
          class="btn-main-dark btn-main-hover-yellow mr-1"
          :to="{name: 'editscheduleritem', params: {idSchedulerItem: schedulerItem.id}}"
          v-if="userRole == 1"
          tag="button"
        >Edit Item</router-link>
        <button
          class="btn-main-dark btn-main-hover-red"
          v-if="userRole == 1"
          @click="tryDeleteSchedulerItem(schedulerItem)"
        >Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import scheduler from "../../scheduler.js";

export default {
  data() {
    return {
      schedulerItems: []
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },
    executionFrequencies() {
      return scheduler.executionFrequencies();
    },
    daysOfWeek() {
      return scheduler.daysOfWeek();
    }
  },
  methods: {
    getExecutionFrequency(idExecutionFrequency) {
      return this.executionFrequencies.find(d => d.id == idExecutionFrequency)
        .value;
    },
    getExecutionDay(idDayOfWeek) {
      return this.daysOfWeek.find(d => d.id == idDayOfWeek).value;
    },
    toggleIsActive(schedulerItem, index) {
      Axios.patch(`/scheduler/items/${schedulerItem.id}/isActive`)
        .then(response => {
          if (response.status == 200) {
            this.schedulerItems[index].isActive = !this.schedulerItems[index]
              .isActive;
          }
        })
        .catch(error => {
          const params = {
            title: "Error!",
            text: error.response.data.error,
            type: "error"
          };
          this.$dialogue.show(params);
        });
    },
    tryDeleteSchedulerItem(schedulerItem) {
      const params = {
        title: "Attention!",
        text: "Are you sure to delete this item?",
        type: "confirm",
        onConfirm: () => {
          return this.deleteSchedulerItem(schedulerItem);
        }
      };
      this.$dialogue.show(params);
    },
    deleteSchedulerItem(schedulerItem) {
      Axios.delete(`/scheduler/items/${schedulerItem.id}`)
        .then(response => {
          if (response.status == 200) {
            this.schedulerItems.splice(
              this.schedulerItems.indexOf(schedulerItem),
              1
            );
          }
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
  },
  mounted() {
    Axios.get(`/scheduler/items`)
      .then(response => (this.schedulerItems = response.data))
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
.scheduler-item {
  width: 100%;
}
</style>