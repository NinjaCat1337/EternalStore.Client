<template>
  <div class="field">
    <button @click="showModal">test modal</button>  
</template>

<script>
export default {
  methods: {
    showModal() {
      const params = {
        title: "Attention!",
        text: "Are you sure to delete this item?",
        onConfirm: () => {
          return this.alertFunc();
        }
      };
      this.$dialogue.show(params)
    },
    alertFunc() {
      alert('dadada')
    }
  }
}
</script>

<style scoped>
.field {
  padding-top: 1%;
  padding-left: 15%;
  padding-right: 15%;
}
</style>