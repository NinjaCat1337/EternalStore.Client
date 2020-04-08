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
        <p class="card-text">{{schedulerItem.settings.executionFrequency}}</p>
        <p class="card-text">{{schedulerItem.settings.executionHours}}</p>
        <p class="card-text">{{schedulerItem.settings.executionMinutes}}</p>
        <p class="card-text">{{schedulerItem.settings.executionDayOfWeek}}</p>
      </div>
      <div class="card-footer text-right">
        <router-link
          class="btn-main-dark btn-main-hover-yellow mr-1"
          :to="{name: 'editscheduleritem', params: {idSchedulerItem: schedulerItem.id}}"
          v-if="userRole == 1"
          tag="button"
        >Edit Item</router-link>
        <button
          class="btn-main-dark btn-main-hover-red"
          v-if="userRole == 1"
          @click="tryRemoveProduct(product)"
        >Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      schedulerItems: []
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.userRole;
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