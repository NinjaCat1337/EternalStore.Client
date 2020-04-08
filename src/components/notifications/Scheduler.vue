<template>
  <div class="field">
    <div class="card text-white bg-dark mb-3">
      <div class="row card-header mb-0 justify-content-end">
        <router-link
          class="btn-main-dark btn-main-hover-green ml-3"
          :to="{name: 'addscheduleritem'}"
          v-if="userRole == 1"
          tag="button"
        >Add Scheduler Item</router-link>
      </div>
      <div class="card-body">
        <component-scheduler-items></component-scheduler-items>
      </div>
      <div class="card-footer text-right"></div>
    </div>
  </div>
</template>

<script>
import SchedulerItems from "./SchedulerItems";

export default {
  computed: {
    userRole() {
      return this.$store.getters.userRole;
    }
  },
  components: {
    componentSchedulerItems: SchedulerItems
  }
};
</script>

<style scoped>
</style>